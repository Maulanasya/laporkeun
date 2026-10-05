import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, ArrowLeft, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";
import forgotIllustration from "../assets/illustrations/forgotpassword.png";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleForgot = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("Masukkan alamat email yang valid.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Email tidak terdaftar di sistem.");
        setIsLoading(false);
        return;
      }

      sessionStorage.setItem("reset_email", email);
      setIsLoading(false);
      setIsSubmitted(true);
    } catch (err) {
      console.error("Gagal terhubung ke server:", err);
      setError("Tidak dapat terhubung ke server backend. Pastikan server aktif.");
      setIsLoading(false);
    }
  };

  const goToLogin = () => {
    window.location.href = "/login";
  };

  const goToVerify = () => {
    window.location.href = "/verifikasi-kode";
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
          className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-[#1597A8]/[0.07] blur-3xl pointer-events-none"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute -bottom-52 -right-40 w-[600px] h-[600px] rounded-full bg-[#E9C46A]/[0.08] blur-3xl pointer-events-none"
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
                  className="w-[360px] h-[360px] md:w-[500px] md:h-[500px] rounded-full bg-[#1597A8]/10 blur-3xl"
                />
              </div>

              <motion.img
                src={forgotIllustration}
                alt="Ilustrasi Lupa Kata Sandi"
                className="relative z-10 w-full max-w-[620px] mx-auto object-contain"
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
                    Pemulihan Aman
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Instruksi dikirim langsung ke email
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
              <div className="w-full max-w-[500px] mx-auto lg:mx-0 lg:ml-auto">
                <button
                  type="button"
                  onClick={goToLogin}
                  className="group inline-flex items-center gap-2 mb-5 text-xs font-medium text-slate-500 hover:text-[#063B4A] transition-colors cursor-pointer"
                >
                  <ArrowLeft
                    size={14}
                    className="transition-transform duration-300 group-hover:-translate-x-1"
                  />
                  Kembali ke Masuk
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
                        Lupa kata sandi
                        <br />
                        Anda ?
                      </h1>
                      <p className="text-sm text-slate-500 leading-relaxed mt-3 max-w-md">
                        Masukkan email Anda yang terdaftar untuk menerima instruksi pengaturan ulang kata sandi.
                      </p>
                    </div>
                  </div>

                  {error && !isSubmitted && (
                    <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2.5 text-red-600 text-xs font-medium">
                      <AlertCircle size={16} className="shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-5 rounded-2xl bg-cyan-50/80 border border-cyan-100 text-center space-y-4"
                    >
                      <div className="w-12 h-12 rounded-full bg-cyan-100 text-[#1597A8] flex items-center justify-center mx-auto">
                        <CheckCircle2 size={26} />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-[#063B4A]">
                          Kode OTP Sudah Terkirim!
                        </p>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Kode OTP sudah terkirim melalui email Anda, tolong cek email Anda di{" "}
                          <span className="font-semibold text-[#1597A8]">{email}</span>.
                        </p>
                      </div>

                      <motion.button
                        type="button"
                        onClick={goToVerify}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.985 }}
                        className="w-full h-11 rounded-xl bg-[#063B4A] text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors hover:bg-[#032D39]"
                      >
                        Masukkan Kode Verifikasi
                        <ArrowRight size={15} />
                      </motion.button>

                      <button
                        type="button"
                        onClick={() => setIsSubmitted(false)}
                        className="text-[11px] font-medium text-slate-500 hover:text-[#1597A8] transition-colors cursor-pointer block mx-auto pt-1"
                      >
                        Ganti email atau kirim ulang
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleForgot} noValidate className="space-y-5">
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="block text-xs font-semibold text-[#17343D]"
                        >
                          Email
                        </label>
                        <div className="relative">
                          <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (error) setError("");
                            }}
                            placeholder="Masukkan Email Anda"
                            aria-invalid={!!error}
                            aria-describedby={error ? "email-error" : undefined}
                            className={`w-full h-12 px-4 rounded-xl border text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all focus:bg-white focus:ring-4 ${
                              error
                                ? "border-red-300 focus:border-red-400 focus:ring-red-400/10 bg-slate-50/70"
                                : "border-slate-200 bg-slate-50/70 focus:border-[#1597A8] focus:ring-[#1597A8]/10"
                            }`}
                          />
                        </div>
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
                        {isLoading ? "Memproses..." : "Lanjut"}
                        {!isLoading && <ArrowRight size={17} />}
                      </motion.button>
                    </form>
                  )}

                  <div className="mt-7 pt-6 border-t border-slate-100 text-center">
                    <p className="text-xs text-slate-500">
                      Sudah ingat password Anda?
                      <button
                        type="button"
                        onClick={goToLogin}
                        className="ml-1 font-semibold text-[#063B4A] hover:text-[#1597A8] transition-colors cursor-pointer"
                      >
                        Masuk di sini
                      </button>
                    </p>
                  </div>
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