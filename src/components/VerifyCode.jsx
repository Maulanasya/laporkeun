import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { ArrowRight, ArrowLeft, ShieldCheck, AlertCircle } from "lucide-react";
import verifyIllustration from "../assets/illustrations/verify.png";

export default function VerifyCode() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    if (error) setError("");

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const code = otp.join("");

    if (code.length < 6) {
      setError("Masukkan 6 digit kode verifikasi dengan lengkap.");
      return;
    }

    setError("");
    setIsLoading(true);

    const email = sessionStorage.getItem("reset_email");

    if (!email) {
      setError("Sesi email tidak ditemukan. Silakan ulangi proses lupa password.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: code }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Kode OTP tidak valid.");
        setIsLoading(false);
        return;
      }

      sessionStorage.setItem("reset_otp", code);
      setIsLoading(false);
      window.location.href = "/buat-sandi-baru";
    } catch (err) {
      console.error("Gagal terhubung ke server:", err);
      setError("Tidak dapat terhubung ke server backend.");
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    const email = sessionStorage.getItem("reset_email");
    if (!email) {
      alert("Sesi email tidak ditemukan.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(`Kode OTP baru telah dikirim ulang! (Debug OTP: ${data.debugOtp})`);
      } else {
        alert("Gagal mengirim ulang kode.");
      }
    } catch (error) {
      alert("Terjadi kesalahan jaringan.");
    }
  };

  const goToForgotPassword = () => {
    window.location.href = "/lupa-password";
  };

  return (
    <div className="min-h-screen bg-[#F7FAFA] text-slate-900 font-['Poppins']">
      <main className="relative min-h-screen overflow-hidden flex items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute -top-40 -left-40 w-130 h-130 rounded-full bg-[#1597A8]/[0.07] blur-3xl pointer-events-none"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute -bottom-52 -right-40 w-150 h-150 rounded-full bg-[#E9C46A]/8 blur-3xl pointer-events-none"
        />

        <div className="relative w-full max-w-7xl mx-auto px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Bagian Ilustrasi */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative hidden lg:block lg:order-1"
            >
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.7, 0.5],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-90 h-90 md:w-125 md:h-125 rounded-full bg-[#1597A8]/10 blur-3xl"
                />
              </div>

              <motion.img
                src={verifyIllustration}
                alt="Ilustrasi Kode Verifikasi"
                className="relative z-10 w-full max-w-155 mx-auto object-contain"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute z-20 left-4 md:left-10 bottom-6 md:bottom-10 bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-xl shadow-slate-900/10 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center text-[#1597A8]">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#063B4A]">
                    Verifikasi Aman
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Masukkan kode konfirmasi Anda
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Bagian Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="order-1 lg:order-2"
            >
              <div className="w-full max-w-125 mx-auto lg:mx-0 lg:ml-auto">
                <button
                  type="button"
                  onClick={goToForgotPassword}
                  className="group inline-flex items-center gap-2 mb-5 text-xs font-medium text-slate-500 hover:text-[#063B4A] transition-colors cursor-pointer"
                >
                  <ArrowLeft
                    size={14}
                    className="transition-transform duration-300 group-hover:-translate-x-1"
                  />
                  Kembali
                </button>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  className="bg-white border border-slate-200 rounded-[28px] p-7 md:p-9 shadow-[0_25px_70px_-25px_rgba(6,59,74,0.18)]"
                >
                  <div className="space-y-4 mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1597A8]" />
                      <span className="text-[9px] font-bold tracking-[0.14em] uppercase text-[#063B4A]">
                        Ruang Aman LaporKeun!
                      </span>
                    </div>

                    <div>
                      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#063B4A] leading-tight">
                        Kode Verifikasi
                      </h1>
                      <p className="text-sm text-slate-500 leading-relaxed mt-3 max-w-md">
                        Masukkan 6 digit kode verifikasi yang telah dikirimkan melalui email Anda.
                      </p>
                    </div>
                  </div>

                  {error && (
                    <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2.5 text-red-600 text-xs font-medium">
                      <AlertCircle size={16} className="shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <form onSubmit={handleVerify} noValidate className="space-y-6">
                    <div className="flex items-center justify-between gap-1.5 sm:gap-2">
                      {otp.map((data, index) => (
                        <input
                          key={index}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          ref={(el) => (inputRefs.current[index] = el)}
                          value={data}
                          onChange={(e) => handleChange(e.target.value, index)}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          className={`w-10 h-12 sm:w-12 sm:h-14 md:w-14 md:h-16 text-center text-lg sm:text-xl font-bold rounded-xl border outline-none transition-all focus:bg-white focus:ring-4 ${
                            error
                              ? "border-red-300 focus:border-red-400 focus:ring-red-400/10 bg-slate-50/70 text-red-500"
                              : "border-slate-200 bg-slate-50/70 text-slate-700 focus:border-[#1597A8] focus:ring-[#1597A8]/10"
                          }`}
                        />
                      ))}
                    </div>

                    <div className="text-xs text-slate-500 text-center flex items-center justify-center gap-1">
                      <span>Tidak menerima kode?</span>
                      <button
                        type="button"
                        onClick={handleResend}
                        className="font-semibold text-[#063B4A] hover:text-[#1597A8] transition-colors cursor-pointer"
                      >
                        Kirim Ulang
                      </button>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      whileHover={{
                        scale: 1.01,
                        boxShadow: "0 14px 30px -10px rgba(21,151,168,0.45)",
                      }}
                      whileTap={{
                        scale: 0.985,
                      }}
                      className="w-full h-12 rounded-xl bg-[#063B4A] text-white text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors hover:bg-[#032D39] disabled:opacity-50"
                    >
                      {isLoading ? "Memverifikasi..." : "Lanjut"}
                      {!isLoading && <ArrowRight size={17} />}
                    </motion.button>
                  </form>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="flex items-center justify-center gap-2 mt-5"
                >
                  <ShieldCheck size={14} className="text-[#1597A8]" />
                  <p className="text-[10px] text-slate-400">
                    Data kamu dilindungi dengan sistem keamanan LaporKeun!
                  </p>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </main>
    </div>
  );
}