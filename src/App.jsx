import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Shield,
  Lock,
  UserCheck,
  FileText,
  ArrowRight,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Search,
  HeartHandshake,
  Eye,
  ShieldCheck,
  Compass,
  Phone,
} from "lucide-react";

import { images } from "./assets";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword"; 

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const Glow = ({
  className = "",
  color = "#1597A8",
  size = 480,
  opacity = 0.07,
  delay = 0,
  centered = false,
  pulse = false,
}) => {
  const blur = Math.min(64, Math.max(24, size * 0.14));

  return (
    <div
      aria-hidden="true"
      className={`absolute pointer-events-none ${
        centered ? "inset-0 flex items-center justify-center" : ""
      } ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 1,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ width: size, height: size }}
        className="shrink-0"
      >
        <motion.div
          animate={
            pulse
              ? {
                  scale: [1, 1.05, 1],
                  opacity: [opacity * 0.7, opacity, opacity * 0.7],
                }
              : undefined
          }
          transition={
            pulse
              ? { duration: 6, repeat: Infinity, ease: "easeInOut" }
              : undefined
          }
          style={{
            backgroundColor: color,
            opacity,
            filter: `blur(${blur}px)`,
          }}
          className="w-full h-full rounded-full"
        />
      </motion.div>
    </div>
  );
};

export default function App() {
  const [ticket, setTicket] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const pathname = window.location.pathname;

  if (pathname === "/login") {
    return <Login />;
  }

  if (pathname === "/register") {
    return <Register />;
  }

  if (pathname === "/lupa-password") {
    return <ForgotPassword />;
  }

  const handleTrackTicket = (e) => {
    e.preventDefault();
    if (!ticket.trim()) return;
    alert(`Melacak ID Tiket: ${ticket}`);
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Apakah laporan saya benar-benar anonim dan tidak diketahui pihak sekolah?",
      a: "Laporan dilindungi dengan sistem enkripsi dan opsi anonim penuh sehingga identitas pelapor tetap terjaga kerahasiaannya.",
    },
    {
      q: "Bagaimana cara saya melacak perkembangan laporan saya?",
      a: "Anda dapat memasukkan kode unik atau nomor tiket laporan pada kolom pencarian di halaman beranda.",
    },
    {
      q: "Berapa lama waktu yang dibutuhkan hingga konselor merespons?",
      a: "Tim konselor dan psikolog kami memproses laporan dengan cepat dalam kurun waktu kurang dari 24 jam.",
    },
    {
      q: "Apakah LaporKeun! berbayar untuk siswa?",
      a: "Tidak, platform ini 100% gratis dan dipersembahkan khusus sebagai fasilitas perlindungan bagi siswa.",
    },
    {
      q: "Bukti apa saja yang dapat saya lampirkan dalam formulir pengaduan?",
      a: "Anda dapat melampirkan tangkapan layar (screenshot), foto, atau dokumen pendukung kronologi kejadian.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col font-['Poppins'] bg-white text-slate-900 selection:bg-cyan-100 selection:text-brand-primary overflow-x-hidden">
      
      {/* Navbar Component */}
      <Navbar />

      {/* Hero Section */}
      <section
        id="beranda"
        className="relative pt-[118px] pb-16 md:pt-[142px] md:pb-24 bg-white overflow-hidden"
      >
        <Glow
          color="#1597A8"
          size={520}
          opacity={0.07}
          className="top-[8%] left-[-220px]"
        />
        <Glow
          color="#E9C46A"
          size={520}
          opacity={0.08}
          delay={0.2}
          className="bottom-[8%] right-[-220px]"
        />

        <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-6 relative z-10"
          >
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-brand-primary leading-[1.1]"
            >
              Ruang Aman Tanpa Takut untuk Bersuara
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-slate-600 text-base leading-relaxed max-w-xl"
            >
              LaporKeun! menyediakan perlindungan privasi penuh, enkripsi
              end-to-end, dan konseling profesional rahasia untuk membantu siswa
              menghadapi perundungan dan tekanan mental di sekolah.
            </motion.p>

            <motion.form
              variants={fadeUp}
              onSubmit={handleTrackTicket}
              className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white p-2 rounded-3xl sm:rounded-full shadow-lg shadow-slate-200/70 border border-slate-200 max-w-xl gap-2"
            >
              <div className="flex items-center gap-3 px-4 py-2 w-full">
                <Search size={18} className="text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={ticket}
                  onChange={(e) => setTicket(e.target.value)}
                  placeholder="Masukkan ID / Kode Tiket Laporan Anda"
                  className="w-full py-1.5 text-sm outline-none text-slate-700 bg-transparent placeholder:text-slate-400 font-medium"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-6 py-3 bg-brand-tertiary text-white rounded-2xl sm:rounded-full text-sm font-semibold flex items-center justify-center gap-2 shadow-sm shrink-0 cursor-pointer hover:bg-brand-tertiaryHover transition"
              >
                Cari
                <ArrowRight size={16} />
              </motion.button>
            </motion.form>

            <motion.p
              variants={fadeUp}
              className="text-xs font-medium text-slate-500 flex items-center gap-2"
            >
              <Lock size={14} className="text-brand-tertiary shrink-0" />
              Kerahasiaan identitas dan data Anda terjamin 100% aman dan anonim.
            </motion.p>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-3 pt-6 border-t border-slate-100 gap-4"
            >
              {[
                {
                  value: "15,000+",
                  label: "Laporan Tertangani",
                  color: "text-amber-600",
                },
                {
                  value: "99.8%",
                  label: "Kerahasiaan Terjamin",
                  color: "text-emerald-600",
                },
                {
                  value: "24/7",
                  label: "Respons Cepat",
                  color: "text-brand-primary",
                },
              ].map((stat, index) => (
                <motion.div key={index} variants={fadeUp}>
                  <h3 className={`text-2xl md:text-3xl font-bold ${stat.color}`}>
                    {stat.value}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex justify-center relative z-10"
          >
            <Glow color="#1597A8" size={440} opacity={0.07} centered pulse />
            <motion.img
              src={images?.hero}
              alt="Ilustrasi LaporKeun"
              className="relative w-full max-w-lg object-contain"
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Fitur Section */}
      <section id="fitur" className="relative py-20 bg-white overflow-hidden">
        <Glow
          color="#1597A8"
          size={420}
          opacity={0.07}
          className="top-[8%] left-[-200px]"
        />
        <Glow
          color="#E9C46A"
          size={400}
          opacity={0.08}
          delay={0.2}
          className="bottom-[8%] right-[-200px]"
        />

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16 space-y-3"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-brand-primary">
              Fitur Unggulan
            </h2>
            <p className="text-slate-600 text-sm md:text-base">
              Empat fondasi perlindungan komprehensif yang dirancang untuk
              menjaga kesehatan mental, keadilan, dan kenyamanan pelajar.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Shield size={22} />,
                title: "Lapor Anonim",
                desc: "Pengaduan bullying secara anonim atau terverifikasi resmi tanpa membuka identitas.",
                badge: "Pelajar Empati",
              },
              {
                icon: <MessageSquare size={22} />,
                title: "Chat Psikolog",
                desc: "Terhubung langsung dengan profesional konselor sekolah kapan pun dibutuhkan.",
                badge: "Jadwalkan Konsultasi",
              },
              {
                icon: <FileText size={22} />,
                title: "Tracking Tiket",
                desc: "Pantau status laporan investigasi dan intervensi sekolah secara real-time.",
                badge: "Cek Status Laporan",
              },
              {
                icon: <UserCheck size={22} />,
                title: "Dashboard Siswa",
                desc: "Pusat bantuan sekolah: menyimpan profil terverifikasi, riwayat interaksi, dan sumber daya.",
                badge: "Buka Dashboard",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -6,
                  boxShadow: "0 20px 40px -12px rgba(15,76,92,0.15)",
                }}
                className="p-6 rounded-2xl bg-white border border-slate-200 transition-all duration-300 space-y-4 flex flex-col"
              >
                <div className="w-11 h-11 rounded-xl bg-cyan-50 flex items-center justify-center text-brand-tertiary">
                  {feature.icon}
                </div>
                <h3 className="text-base font-semibold text-brand-primary">
                  {feature.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed flex-1">
                  {feature.desc}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-tertiary hover:gap-2 transition-all"
                >
                  {feature.badge}
                  <ArrowRight size={12} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Keamanan Section */}
      <section
        id="keamanan"
        className="relative py-20 bg-brand-primary text-white overflow-hidden"
      >
        <Glow
          color="#E9C46A"
          size={480}
          opacity={0.08}
          className="top-[-150px] right-[-150px]"
        />
        <Glow
          color="#1597A8"
          size={440}
          opacity={0.16}
          delay={0.2}
          className="bottom-[-140px] left-[-140px]"
        />

        <div className="relative max-w-7xl mx-auto px-6 text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto space-y-3"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Keamanan</h2>
            <p className="text-slate-300 text-sm md:text-base">
              Keamanan dan Privasi Anda adalah Prioritas Tertinggi Kami
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
            {[
              {
                icon: <Eye size={22} />,
                title: "Jaminan Hukum",
                desc: "Perlindungan hukum terhadap siswa dari intimidasi tindakan dan pihak mana pun.",
              },
              {
                icon: <Lock size={22} />,
                title: "Data Terenkripsi",
                desc: "Enkripsi tingkat tinggi untuk melindungi laporan sensitif Anda.",
              },
              {
                icon: <ShieldCheck size={22} />,
                title: "Laporan Anonim",
                desc: "Kerahasiaan identitas pelapor dijamin dari hulu ke hilir, sehingga aman.",
              },
              {
                icon: <UserCheck size={22} />,
                title: "Privasi Terjaga",
                desc: "Hanya pihak berwenang dan tim ahli yang menangani laporan.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -4,
                  backgroundColor: "rgba(255,255,255,0.08)",
                }}
                className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3 backdrop-blur-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-brand-tertiary">
                  {item.icon}
                </div>
                <h4 className="font-semibold text-white text-sm">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cara Kerja Section */}
      <section id="cara-kerja" className="relative py-24 bg-white overflow-hidden">
        <Glow
          color="#1597A8"
          size={520}
          opacity={0.06}
          className="top-[10%] right-[-260px] hidden lg:block"
        />

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16 space-y-2"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-brand-primary">
              Proses yang Sederhana dan Aman
            </h2>
            <p className="text-slate-600 text-sm md:text-base">
              Mulai dari menceritakan kejadian hingga mendapatkan pendampingan,
              semuanya dirancang agar mudah diikuti.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center relative min-h-[420px] items-center"
            >
              <Glow color="#1597A8" size={380} opacity={0.08} centered pulse />
              <motion.img
                src={images?.carakerja}
                alt="Cara Kerja LaporKeun"
                className="relative z-10 w-full max-w-[520px] object-contain"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            <div className="grid grid-cols-1 gap-4 relative z-10">
              {[
                {
                  step: "01",
                  title: "Ceritakan Kejadianmu",
                  desc: "Tulis kronologi kejadian dan unggah bukti pendukung jika diperlukan.",
                  badge: "Anonim 100%",
                },
                {
                  step: "02",
                  title: "Dapatkan Kode Tiket",
                  desc: "Sistem memberikan kode unik yang dapat digunakan untuk memantau laporan.",
                  badge: "Simpan Kode Rahasia",
                },
                {
                  step: "03",
                  title: "Tim Meninjau Laporan",
                  desc: "Tim melakukan asesmen terhadap laporan dan menentukan tindak lanjut.",
                  badge: "Respons Cepat",
                },
                {
                  step: "04",
                  title: "Pantau Tindak Lanjut",
                  desc: "Anda mendapatkan informasi mengenai perkembangan dan solusi laporan.",
                  badge: "Pendampingan",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -4, x: 4 }}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-3 transition"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-brand-primary text-white flex items-center justify-center text-xs font-bold">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-bold text-brand-primary text-sm">
                          {item.title}
                        </h4>
                        <span className="text-[9px] font-semibold text-brand-tertiary bg-cyan-50 px-2 py-1 rounded-full">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed mt-2">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Artikel Section */}
      <section id="artikel" className="relative py-20 bg-slate-50/60 overflow-hidden">
        <Glow
          color="#1597A8"
          size={440}
          opacity={0.07}
          className="top-[6%] left-[-200px]"
        />
        <Glow
          color="#E9C46A"
          size={420}
          opacity={0.08}
          delay={0.2}
          className="bottom-[6%] right-[-200px]"
        />

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 space-y-2"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-brand-primary">
              Dukungan & Artikel Pilihan
            </h2>
            <p className="text-slate-600 text-sm md:text-base">
              Temukan informasi yang membantumu memahami, menghadapi, dan
              melewati situasi sulit dengan lebih tenang.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -5 }}
              className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
            >
              <div className="w-full h-64 md:h-72 overflow-hidden bg-slate-200">
                <motion.img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200"
                  alt="Cyberbullying"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                  <span>12 Maret 2025</span>
                  <span>•</span>
                  <span className="text-brand-tertiary">
                    Tim Psikologi LaporKeun!
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-brand-primary leading-snug">
                  Mengenal Tanda-tanda Cyberbullying dan Langkah Tegas
                  Menghadapinya di Era Digital
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                  Perundungan daring sering kali tidak kasat mata namun berdampak
                  mendalam. Pelajari bagaimana menjaga batasan digital dan cara
                  mendokumentasikan bukti pelecehan secara sah tanpa memicu
                  eskalasi konflik.
                </p>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                    <div className="w-7 h-7 rounded-full bg-cyan-50 flex items-center justify-center text-brand-tertiary">
                      <HeartHandshake size={14} />
                    </div>
                    Tim Psikologi LaporKeun!
                  </div>

                  <motion.a
                    href="#"
                    whileHover={{ x: 4 }}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-tertiary"
                  >
                    Baca Selengkapnya
                    <ArrowRight size={12} />
                  </motion.a>
                </div>
              </div>
            </motion.div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5"
              >
                <h4 className="font-semibold text-brand-primary text-sm">
                  Kategori Panduan
                </h4>
                <div className="space-y-2 text-xs font-medium text-slate-600">
                  {[
                    "Pemberdayaan Diri",
                    "Bentuk Bully",
                    "Kesehatan Mental",
                    "Tips & Trik Menghadapi Tekanan",
                    "Artikel & Edukasi Sekolah",
                  ].map((category, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 4 }}
                      className={`p-3 rounded-xl transition cursor-pointer flex justify-between items-center ${
                        index === 0
                          ? "bg-brand-tertiary text-white"
                          : "bg-slate-50 hover:bg-cyan-50 hover:text-brand-tertiary"
                      }`}
                    >
                      <span>{category}</span>
                      <ArrowRight size={14} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -3 }}
                className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-100 space-y-2"
              >
                <h5 className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                  <Compass size={14} />
                  Tahukah Kamu?
                </h5>
                <p className="text-[11px] text-emerald-700 leading-relaxed">
                  Menyimpan tangkapan layar lengkap beserta tanggal adalah langkah
                  awal yang sangat penting ketika mendokumentasikan kejadian
                  bullying.
                </p>
              </motion.div>
            </div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6"
          >
            {[
              {
                category: "Advokasi",
                title: "Langkah Pertama yang Harus Dilakukan Saat...",
                desc: "Jangan jadi bystander pasif. Ketahui cara mengintervensi dengan aman tanpa menempatkan diri dalam bahaya.",
                date: "23 April 2026",
              },
              {
                category: "Kesehatan Mental",
                title: "Menjaga Kesehatan Mental di Tengah Tekanan...",
                desc: "Strategi manajemen stres, teknik pernapasan grounding, dan kapan saatnya meminta bantuan ahli.",
                date: "12 Oktober 2025",
              },
              {
                category: "Hukum & Etik",
                title: "Hak Perlindungan Hukum Siswa: Panduan Praktis...",
                desc: "Peraturan dan perlindungan siswa yang menjamin ruang belajar aman dari intimidasi.",
                date: "3 Maret 2026",
              },
              {
                category: "Komunitas",
                title: "Membangun Ruang Aman di Kelas: Suara Pelajar...",
                desc: "Kisah inspiratif para pelajar yang berhasil menciptakan budaya suportif di sekolah.",
                date: "21 Agustus 2021",
              },
            ].map((article, index) => (
              <motion.article
                key={index}
                variants={fadeUp}
                whileHover={{
                  y: -6,
                  boxShadow: "0 18px 35px -15px rgba(15,76,92,0.16)",
                }}
                className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 cursor-pointer"
              >
                <span className="inline-flex px-2 py-1 rounded-md bg-amber-50 text-amber-700 text-[9px] font-semibold">
                  {article.category}
                </span>
                <h3 className="text-sm font-bold text-brand-primary leading-snug">
                  {article.title}
                </h3>
                <p className="text-[10px] text-slate-600 leading-relaxed">
                  {article.desc}
                </p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[9px] text-slate-500">
                    {article.date}
                  </span>
                  <motion.span whileHover={{ x: 3 }} className="text-brand-tertiary">
                    <ArrowRight size={13} />
                  </motion.span>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Banner Darurat Section */}
      <section className="relative py-12 bg-white">
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="bg-brand-primary p-8 md:p-12 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden"
          >
            <Glow
              color="#E9C46A"
              size={360}
              opacity={0.1}
              className="top-[-100px] right-[-100px]"
            />
            <Glow
              color="#1597A8"
              size={280}
              opacity={0.2}
              delay={0.2}
              className="bottom-[-80px] left-[-40px]"
            />

            <div className="space-y-2 text-center md:text-left relative z-10">
              <h3 className="text-2xl font-bold">Butuh Bantuan Segera?</h3>
              <p className="text-slate-300 text-xs md:text-sm max-w-xl">
                Jika Anda atau rekan Anda berada dalam situasi krisis berbahaya
                yang membutuhkan pertolongan darurat medis atau psikologis
                instan, tim siaga darurat kami siap 24/7.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3.5 bg-brand-tertiary text-white rounded-xl text-sm font-medium shadow-md whitespace-nowrap cursor-pointer relative z-10 inline-flex items-center gap-2"
            >
              <Phone size={16} />
              Dapatkan Bantuan
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className="relative py-20 bg-white border-t border-slate-100 overflow-hidden"
      >
        <Glow
          color="#1597A8"
          size={400}
          opacity={0.07}
          className="top-[8%] left-[-200px]"
        />
        <Glow
          color="#E9C46A"
          size={400}
          opacity={0.08}
          delay={0.2}
          className="bottom-[8%] right-[-200px]"
        />

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16 space-y-3"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-brand-primary">
              FAQs
            </h2>
            <p className="text-slate-600 text-sm md:text-base">
              Pertanyaan yang Sering Diajukan Seputar Keamanan dan Layanan
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-3 relative z-10">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="border border-slate-200 rounded-2xl overflow-hidden bg-white"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left font-semibold text-sm text-brand-primary flex justify-between items-center hover:bg-slate-50 transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <motion.span
                      animate={{ rotate: openFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {openFaq === index ? (
                        <ChevronUp size={18} className="text-brand-tertiary" />
                      ) : (
                        <ChevronDown size={18} className="text-slate-400" />
                      )}
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:flex justify-center items-center relative min-h-[360px]"
            >
              <Glow color="#1597A8" size={300} opacity={0.08} centered pulse />
              <motion.img
                src={images?.faq}
                alt="FAQ Ilustrasi"
                className="relative z-10 w-full max-w-xs object-contain"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-12 bg-white">
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="bg-brand-primary p-8 md:p-16 rounded-3xl text-white flex flex-col items-center justify-center gap-6 shadow-xl relative overflow-hidden text-center"
          >
            <Glow
              color="#E9C46A"
              size={440}
              opacity={0.1}
              className="top-[-150px] right-[-150px]"
            />
            <Glow
              color="#1597A8"
              size={320}
              opacity={0.2}
              delay={0.2}
              className="bottom-[-100px] left-[-60px]"
            />

            <div className="space-y-3 relative z-10 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold">
                Jangan Hadapi Sendiri
              </h2>
              <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                Selama suara berharga, kami siap mendengarkan, melindungi, dan
                mendampingi langkahmu menuju keadilan dan pemulihan mental yang
                sehat.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-7 py-3.5 bg-brand-tertiary text-white rounded-xl text-sm font-medium shadow-md cursor-pointer inline-flex items-center gap-2 relative z-10"
            >
              <HeartHandshake size={18} />
              Buat Laporan Sekarang
            </motion.button>

            <p className="text-[10px] text-slate-400 relative z-10">
              Layanan Rahasia • Tanpa Biaya • Bebas Tekanan
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}