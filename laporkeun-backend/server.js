import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Koneksi ke Database MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Koneksi ke database gagal:", err);
    return;
  }
  console.log("Berhasil terhubung ke database MySQL db_laporkeun!");
});

// Endpoint Login
app.post("/api/login", (req, res) => {
  const { nisn, password } = req.body;

  if (!nisn || !password) {
    return res.status(400).json({ message: "NISN dan password wajib diisi!" });
  }

  const query = "SELECT * FROM users WHERE nisn = ?";
  db.query(query, [nisn], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Terjadi kesalahan pada server", error: err });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "NISN atau password salah!" });
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: "NISN atau password salah!" });
    }

    res.status(200).json({
      message: "Login berhasil!",
      user: {
        id: user.id,
        nisn: user.nisn,
        nama_lengkap: user.nama_lengkap,
        email: user.email,
        kelas: user.kelas,
      },
    });
  });
});

// Endpoint Register
app.post("/api/register", async (req, res) => {
  const { nisn, nama_lengkap, email, kelas, password } = req.body;

  if (!nisn || !nama_lengkap || !email || !kelas || !password) {
    return res.status(400).json({ message: "Semua kolom wajib diisi!" });
  }

  try {
    const checkQuery = "SELECT * FROM users WHERE nisn = ? OR email = ?";
    db.query(checkQuery, [nisn, email], async (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Terjadi kesalahan pada database", error: err });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: "NISN atau Email sudah terdaftar!" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const insertQuery = `
        INSERT INTO users (nisn, nama_lengkap, email, kelas, password) 
        VALUES (?, ?, ?, ?, ?)
      `;
      
      db.query(insertQuery, [nisn, nama_lengkap, email, kelas, hashedPassword], (err, result) => {
        if (err) {
          return res.status(500).json({ message: "Gagal mendaftarkan akun", error: err });
        }

        res.status(201).json({
          message: "Registrasi berhasil! Silakan masuk.",
          userId: result.insertId,
        });
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Endpoint Kirim OTP Lupa Password
app.post("/api/forgot-password", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email wajib diisi!" });
  }

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });

    if (results.length === 0) {
      return res.status(404).json({ message: "Email tidak terdaftar di sistem!" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiredAt = new Date(Date.now() + 15 * 60 * 1000);

    const updateQuery = "UPDATE users SET reset_otp = ?, otp_expired_at = ? WHERE email = ?";
    db.query(updateQuery, [otp, expiredAt, email], (err) => {
      if (err) return res.status(500).json({ message: "Gagal memproses permintaan", error: err });

      res.status(200).json({
        message: "Kode OTP berhasil dikirim ke email Anda.",
        debugOtp: otp,
      });
    });
  });
});

// Endpoint Verifikasi OTP
app.post("/api/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  const query = "SELECT * FROM users WHERE email = ? AND reset_otp = ?";
  db.query(query, [email, otp], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });

    if (results.length === 0) {
      return res.status(400).json({ message: "Kode OTP yang Anda masukkan salah. Periksa kembali." });
    }

    const user = results[0];
    const isExpired = new Date() > new Date(user.otp_expired_at);

    if (isExpired) {
      return res.status(400).json({ message: "Kode OTP sudah kedaluwarsa. Silakan kirim ulang kode." });
    }

    res.status(200).json({ message: "OTP valid!" });
  });
});

// Endpoint Reset Password Baru
app.post("/api/reset-password", async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!newPassword || newPassword.length < 8) {
    return res.status(400).json({ message: "Password baru minimal 8 karakter!" });
  }

  const query = "SELECT * FROM users WHERE email = ? AND reset_otp = ? AND otp_expired_at > NOW()";
  db.query(query, [email, otp], async (err, results) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });

    if (results.length === 0) {
      return res.status(400).json({ message: "Sesi verifikasi tidak valid atau kedaluwarsa." });
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      const updateQuery = "UPDATE users SET password = ?, reset_otp = NULL, otp_expired_at = NULL WHERE email = ?";
      db.query(updateQuery, [hashedPassword, email], (err) => {
        if (err) return res.status(500).json({ message: "Gagal memperbarui password", error: err });

        res.status(200).json({ message: "Kata sandi berhasil diubah! Silakan masuk." });
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
});

// Jalankan Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server backend berjalan di port ${PORT}`);
});