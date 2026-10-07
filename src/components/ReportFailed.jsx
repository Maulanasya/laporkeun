import React from "react";
import { motion } from "motion/react";
import { RefreshCcw } from "lucide-react";
import failedIllustration from "../assets/illustrations/failed.png";

const DEFAULT_MESSAGE =
  "Terjadi gangguan pada sistem. Silakan coba kembali beberapa saat lagi.";

// Ubah pesan teknis (bahasa Inggris / kode status) jadi bahasa yang mudah dipahami
function toFriendlyMessage(raw) {
  const msg = (raw || "").toString().trim();
  if (!msg) return DEFAULT_MESSAGE;

  const lower = msg.toLowerCase();

  // Gagal terhubung (server mati / tidak ada internet)
  if (
    lower.includes("failed to fetch") ||
    lower.includes("networkerror") ||
    lower.includes("network request failed") ||
    lower.includes("load failed")
  ) {
    return "Tidak dapat terhubung ke server. Periksa koneksi internetmu, lalu coba kirim lagi.";
  }

  // Terlalu lama merespons
  if (lower.includes("timeout") || lower.includes("timed out")) {
    return "Server terlalu lama merespons. Silakan coba lagi beberapa saat lagi.";
  }

  // Respons server tidak bisa dibaca
  if (lower.includes("unexpected token") || lower.includes("json")) {
    return DEFAULT_MESSAGE;
  }

  // Error dengan kode status, misalnya "Error server (Status: 500)"
  const statusMatch = lower.match(/status:\s*(\d{3})/);
  if (statusMatch) {
    const code = Number(statusMatch[1]);
    if (code === 413) {
      return "Ukuran file bukti terlalu besar. Coba gunakan file yang lebih kecil.";
    }
    if (code >= 500) {
      return "Server sedang mengalami gangguan. Silakan coba lagi beberapa saat lagi.";
    }
    return "Laporanmu belum bisa diproses. Periksa kembali data yang kamu isi, lalu coba lagi.";
  }

  // Pesan dari server yang sudah berupa kalimat biasa, tampilkan apa adanya
  return msg;
}

const SARAN = [
  "Periksa koneksi internetmu",
  "Pastikan semua data sudah terisi dengan benar",
  "Coba kirim ulang beberapa saat lagi",
];

export default function ReportFailed({ errorMessage, onRetry, onBackHome }) {
  return (
    <div className="min-h-screen bg-[#F7FAFA] text-slate-900 font-['Poppins'] flex items-center justify-center p-6 overflow-hidden relative">

      {/* Background Ornaments */}
      <div className="absolute -top-40 -right-40 w-150 h-150 rounded-full bg-[#1597A8]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-125 h-125 rounded-full bg-[#1597A8]/5 blur-3xl pointer-events-none" />

      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

        {/* Bagian Ilustrasi */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex justify-center"
        >
          <motion.img
            src={failedIllustration}
            alt="laporan gagal dikirim"
            className="w-full max-w-md object-contain drop-shadow-lg"
          />
        </motion.div>

        {/* Bagian Kartu Informasi */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white border border-slate-200 rounded-[28px] p-8 md:p-10 shadow-[0_20px_60px_-20px_rgba(6,59,74,0.12)]"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-[#063B4A] mb-3">
            Laporan Gagal Dikirim
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed mb-8">
            Laporanmu belum berhasil dikirim. Jangan khawatir, data yang kamu isi masih tersimpan dan bisa dikirim ulang.
          </p>

          {/* Penyebab */}
          <div className="space-y-2 mb-8">
            <label className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Penyebab
            </label>
            <div className="p-4 rounded-xl border border-red-200 bg-red-50/60">
              <p className="text-sm font-medium text-red-600 leading-relaxed">
                {toFriendlyMessage(errorMessage)}
              </p>
            </div>
          </div>

          {/* Saran */}
          <div className="mb-10 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <h3 className="text-xs font-bold text-[#063B4A] mb-3">Yang bisa kamu coba</h3>
            <ul className="space-y-2">
              {SARAN.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-xs text-slate-500 leading-relaxed"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1597A8] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tombol Aksi */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-6 border-t border-slate-100">
            <button
              onClick={onBackHome}
              className="w-full sm:w-auto px-6 h-12 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm font-semibold hover:bg-slate-50 hover:text-[#063B4A] transition-colors"
            >
              Kembali ke Beranda
            </button>
            <button
              onClick={onRetry}
              className="w-full sm:flex-1 h-12 rounded-xl bg-[#063B4A] text-white text-sm font-semibold hover:bg-[#032D39] transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCcw size={16} /> Coba Lagi
            </button>
          </div>

        </motion.div>
      </div>
    </div>
  );
}