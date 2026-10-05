import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

import loginIllustration from "../assets/illustrations/login.png";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [nisn, setNisn] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!nisn.trim() || !password.trim()) {
      alert("Silakan isi NISN dan password terlebih dahulu.");
      return;
    }

    console.log({
      nisn,
      password,
      remember,
    });
  };

  const goToRegister = () => {
    window.location.href = "/register";
  };

  const goToForgotPassword = () => {
    window.location.href = "/lupa-password";
  };

  return (
    <div className="min-h-screen bg-[#F7FAFA] text-slate-900 font-['Poppins']">
      
      {/* Login Section */}
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
            
            {/* Illustration Section */}
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
                src={loginIllustration}
                alt="Ilustrasi Login LaporKeun"
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
                    Data Terlindungi
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Sistem aman & terenkripsi
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Form Section */}
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
                <a
                  href="/"
                  className="group inline-flex items-center gap-2 mb-5 text-xs font-medium text-slate-500 hover:text-[#063B4A] transition-colors"
                >
                  <ArrowLeft
                    size={14}
                    className="transition-transform duration-300 group-hover:-translate-x-1"
                  />
                  Kembali ke beranda
                </a>

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
                        Selamat Datang
                        <br />
                        Kembali!
                      </h1>
                      <p className="text-sm text-slate-500 leading-relaxed mt-3 max-w-md">
                        Masuk untuk mengakses laporan, memantau perkembangan,
                        dan mendapatkan dukungan dengan aman.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-2">
                      <label
                        htmlFor="nisn"
                        className="block text-xs font-semibold text-[#17343D]"
                      >
                        NISN
                      </label>
                      <div className="relative">
                        <input
                          id="nisn"
                          type="text"
                          value={nisn}
                          onChange={(e) => setNisn(e.target.value)}
                          placeholder="Masukkan NISN"
                          className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/70 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all focus:bg-white focus:border-[#1597A8] focus:ring-4 focus:ring-[#1597A8]/10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="password"
                        className="block text-xs font-semibold text-[#17343D]"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Masukkan password"
                          className="w-full h-12 px-4 pr-12 rounded-xl border border-slate-200 bg-slate-50/70 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all focus:bg-white focus:border-[#1597A8] focus:ring-4 focus:ring-[#1597A8]/10"
                        />

                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#1597A8] transition-colors cursor-pointer"
                          aria-label={
                            showPassword
                              ? "Sembunyikan password"
                              : "Tampilkan password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff size={17} />
                          ) : (
                            <Eye size={17} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={remember}
                          onChange={(e) => setRemember(e.target.checked)}
                          className="peer sr-only"
                        />
                        <span className="w-5 h-5 rounded-md border border-slate-300 bg-white flex items-center justify-center transition-all peer-checked:bg-[#1597A8] peer-checked:border-[#1597A8]">
                          {remember && (
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                            >
                              <path
                                d="M2.5 6L5 8.5L9.5 3.5"
                                stroke="white"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </span>
                        <span className="text-xs text-slate-500">
                          Ingat saya
                        </span>
                      </label>

                      <button
                        type="button"
                        onClick={goToForgotPassword}
                        className="text-xs font-semibold text-[#1597A8] hover:text-[#063B4A] transition-colors cursor-pointer"
                      >
                        Lupa password?
                      </button>
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{
                        scale: 1.01,
                        boxShadow:
                          "0 14px 30px -10px rgba(21,151,168,0.45)",
                      }}
                      whileTap={{
                        scale: 0.985,
                      }}
                      className="w-full h-12 rounded-xl bg-[#063B4A] text-white text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors hover:bg-[#032D39]"
                    >
                      Masuk
                      <ArrowRight size={17} />
                    </motion.button>
                  </form>

                  <div className="mt-7 pt-6 border-t border-slate-100 text-center">
                    <p className="text-xs text-slate-500">
                      Belum punya akun?
                      <button
                        type="button"
                        onClick={goToRegister}
                        className="ml-1 font-semibold text-[#063B4A] hover:text-[#1597A8] transition-colors cursor-pointer"
                      >
                        Daftar di sini
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