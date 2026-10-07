import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Upload, ArrowRight, AlertCircle, ChevronDown, Check } from "lucide-react";
import Navbar from "./Navbar";
import ReportSuccess from "./ReportSuccess";
import ReportFailed from "./ReportFailed";

const KATEGORI_OPTIONS = [
  "Bullying / Perundungan",
  "Kekerasan Verbal",
  "Kekerasan Fisik",
  "Pelecehan / Lainnya",
];

// ==========================================
// 1. KOMPONEN: DROPDOWN KATEGORI
// ==========================================
function KategoriSelect({ value, onSelect, hasError }) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open]);

  useEffect(() => {
    if (!open || activeIndex < 0) return;
    document.getElementById(`kategori-option-${activeIndex}`)?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  const openList = () => {
    const selectedIndex = KATEGORI_OPTIONS.findIndex((item) => item === value);
    setActiveIndex(Math.max(0, selectedIndex));
    setOpen(true);
  };

  const choose = (item) => {
    onSelect(item);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openList();
      }
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % KATEGORI_OPTIONS.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => (i - 1 + KATEGORI_OPTIONS.length) % KATEGORI_OPTIONS.length);
        break;
      case "Home":
        e.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        e.preventDefault();
        setActiveIndex(KATEGORI_OPTIONS.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (activeIndex >= 0) choose(KATEGORI_OPTIONS[activeIndex]);
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
      case "Tab":
        setOpen(false);
        break;
      default:
        break;
    }
  };

  const triggerStyle = open
    ? "bg-white border-[#1597A8] ring-4 ring-[#1597A8]/10"
    : hasError
    ? "bg-slate-50/70 border-red-300 hover:border-red-400 focus-visible:border-red-400 focus-visible:ring-4 focus-visible:ring-red-400/10"
    : "bg-slate-50/70 border-slate-200 hover:border-slate-300 focus-visible:bg-white focus-visible:border-[#1597A8] focus-visible:ring-4 focus-visible:ring-[#1597A8]/10";

  return (
    <div ref={wrapperRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={hasError}
        aria-activedescendant={open && activeIndex >= 0 ? `kategori-option-${activeIndex}` : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={handleKeyDown}
        className={`w-full h-12 px-4 rounded-xl border text-sm flex items-center justify-between gap-3 text-left cursor-pointer outline-none transition-all ${triggerStyle}`}
      >
        <span className="flex items-center gap-2 min-w-0">
          {value ? (
            <span className="font-medium text-slate-700">{value}</span>
          ) : (
            <span className="text-slate-400">Pilih jenis kejadian</span>
          )}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className={`flex shrink-0 ${open ? "text-[#1597A8]" : "text-slate-400"}`}
        >
          <ChevronDown size={17} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="listbox"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "top" }}
            onMouseDown={(e) => e.preventDefault()}
            className="absolute left-0 right-0 top-full mt-2 z-30 max-h-80 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_24px_60px_-20px_rgba(6,59,74,0.28)]"
          >
            {KATEGORI_OPTIONS.map((option, index) => {
              const isSelected = option === value;
              const isActive = index === activeIndex;
              return (
                <div
                  key={option}
                  id={`kategori-option-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => choose(option)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm cursor-pointer transition-colors ${
                    isActive ? "bg-cyan-50" : ""
                  } ${
                    isSelected ? "font-semibold text-[#063B4A]" : "font-medium text-slate-600"
                  }`}
                >
                  <span>{option}</span>
                  {isSelected && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 25 }}
                      className="w-5 h-5 rounded-full bg-[#1597A8] text-white flex items-center justify-center"
                    >
                      <Check size={12} strokeWidth={3} />
                    </motion.span>
                  )}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ==========================================
// 2. KOMPONEN: FORM UTAMA
// ==========================================
export default function FormLaporan() {
  const [formData, setFormData] = useState({
    kategori: "",
    lokasiWaktu: "",
    deskripsi: "",
    bukti: null,
    jenisIdentitas: "anonim",
    setuju: false,
  });

  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // State untuk mengontrol halaman mana yang dirender
  const [submitStatus, setSubmitStatus] = useState("idle"); // 'idle' | 'success' | 'failed'
  const [submitErrorMessage, setSubmitErrorMessage] = useState("");
  const [ticketCode, setTicketCode] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (error) setError("");
  };

  const handleKategoriSelect = (value) => {
    setFormData({ ...formData, kategori: value });
    if (error) setError("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError("Ukuran file maksimal 10 MB.");
        return;
      }
      setFormData({ ...formData, bukti: file });
      setFileName(file.name);
      if (error) setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.kategori || !formData.lokasiWaktu.trim() || !formData.deskripsi.trim()) {
      setError("Silakan isi kategori, lokasi/waktu, dan deskripsi kronologi dengan lengkap.");
      return;
    }

    if (!formData.setuju) {
      setError("Anda harus memastikan informasi yang diberikan sudah sesuai.");
      return;
    }

    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;

    if (formData.jenisIdentitas === "lengkap" && (!user || !user.id)) {
      setError("Anda harus login terlebih dahulu untuk menyertakan identitas lengkap.");
      return;
    }

    setIsLoading(true);

    try {
      const submitData = new FormData();

      submitData.append("category", formData.kategori);
      submitData.append("location_time", formData.lokasiWaktu);
      submitData.append("description", formData.deskripsi);
      submitData.append("is_anonymous", formData.jenisIdentitas === "anonim" ? 1 : 0);

      if (formData.jenisIdentitas === "lengkap" && user && user.id) {
        submitData.append("user_id", user.id);
      }

      if (formData.bukti) {
        submitData.append("evidence_file", formData.bukti);
      }

      const response = await fetch("http://localhost:5000/api/reports", {
        method: "POST",
        body: submitData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error server (Status: ${response.status})`);
      }

      const data = await response.json();

      setTicketCode(data.ticket_code);
      setIsLoading(false);
      setSubmitStatus("success");
    } catch (err) {
      console.error("Error submitting form:", err);
      setSubmitErrorMessage(err.message || "Tidak dapat terhubung ke server backend.");
      setIsLoading(false);
      setSubmitStatus("failed");
    }
  };

  // Navigasi bantu untuk tombol Kembali ke Beranda
  const backToHome = () => {
    window.location.href = "/";
  };

  // Navigasi untuk tombol Lihat Detail.
  // TODO: sesuaikan URL dengan route halaman detail/pelacakan laporanmu.
  const goToDetail = () => {
    window.location.href = `/lacak?kode=${encodeURIComponent(ticketCode)}`;
  };

  // RENDER HALAMAN SUKSES
  if (submitStatus === "success") {
    return (
      <ReportSuccess
        ticketCode={ticketCode}
        onBackHome={backToHome}
        onDetail={goToDetail}
      />
    );
  }

  // RENDER HALAMAN GAGAL
  if (submitStatus === "failed") {
    return (
      <ReportFailed
        errorMessage={submitErrorMessage}
        onRetry={() => setSubmitStatus("idle")}
        onBackHome={backToHome}
      />
    );
  }

  // RENDER HALAMAN FORM UTAMA ('idle')
  return (
    <div className="min-h-screen bg-[#F7FAFA] text-slate-900 font-['Poppins']">
      <Navbar />

      <div className="relative pt-25 pb-16 bg-linear-to-b from-[#1597A8]/10 to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-10 shadow-sm relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 w-64 h-64 bg-[#1597A8]/5 rounded-full blur-3xl pointer-events-none" />
            <h1 className="text-2xl md:text-3xl font-bold text-[#063B4A]">
              Formulir Pengaduan & Pelaporan
            </h1>
            <p className="text-sm text-slate-500 mt-2">
              Sampaikan laporanmu dengan jujur. Identitas dan kerahasiaanmu dijamin aman.
            </p>
          </motion.div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Form Bagian Kiri */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm"
          >
            <h2 className="text-lg font-bold text-[#063B4A] mb-6">Form Laporan</h2>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2.5 text-red-600 text-xs font-medium">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#17343D]">Kategori Kasus</label>
                <KategoriSelect
                  value={formData.kategori}
                  onSelect={handleKategoriSelect}
                  hasError={!!error && !formData.kategori}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#17343D]">Detail lokasi & Waktu Kejadian</label>
                <input
                  type="text"
                  name="lokasiWaktu"
                  value={formData.lokasiWaktu}
                  onChange={handleChange}
                  placeholder="Jelaskan tempat dan waktu kejadian"
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/70 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:bg-white focus:border-[#1597A8] focus:ring-4 focus:ring-[#1597A8]/10"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#17343D]">Deskripsi Kronologi</label>
                <textarea
                  name="deskripsi"
                  rows={4}
                  value={formData.deskripsi}
                  onChange={handleChange}
                  placeholder="Ceritakan kejadian secara berurutan"
                  className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50/70 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:bg-white focus:border-[#1597A8] focus:ring-4 focus:ring-[#1597A8]/10 resize-none"
                />
                <p className="text-[10px] text-slate-400">Hindari mencantumkan informasi pribadi yang tidak berkaitan dengan laporan.</p>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#17343D]">Unggah Bukti Pendukung (Opsional)</label>
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-[#1597A8] rounded-2xl p-6 bg-slate-50/50 cursor-pointer transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center text-[#1597A8] mb-2">
                    <Upload size={22} />
                  </div>
                  <span className="text-xs font-semibold text-slate-700">
                    {fileName ? fileName : "Pilih file atau tarik & lepas disini"}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-1">JPG, JPEG, atau PNG • Maks 10 MB</span>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>
              </div>

              <div className="space-y-3 pt-2">
                <label className="block text-xs font-semibold text-[#17343D]">Identitas Pelapor</label>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50/40 cursor-pointer hover:bg-slate-50 transition-colors">
                    <input
                      type="radio"
                      name="jenisIdentitas"
                      value="anonim"
                      checked={formData.jenisIdentitas === "anonim"}
                      onChange={handleChange}
                      className="mt-0.5 accent-[#1597A8]"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#063B4A]">Anonim</p>
                      <p className="text-[10px] text-slate-500">Identitas tidak ditampilkan</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50/40 cursor-pointer hover:bg-slate-50 transition-colors">
                    <input
                      type="radio"
                      name="jenisIdentitas"
                      value="lengkap"
                      checked={formData.jenisIdentitas === "lengkap"}
                      onChange={handleChange}
                      className="mt-0.5 accent-[#1597A8]"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#063B4A]">Gunakan Nama Lengkap</p>
                      <p className="text-[10px] text-slate-500">Nama akan terhubung dengan laporan</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="setuju"
                    checked={formData.setuju}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-slate-300 accent-[#1597A8]"
                  />
                  <span className="text-xs text-slate-600">
                    Saya memastikan informasi yang saya berikan sesuai dengan kejadian yang saya laporkan.
                  </span>
                </label>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.985 }}
                className="w-full h-12 rounded-xl bg-[#063B4A] text-white text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors hover:bg-[#032D39] disabled:opacity-50"
              >
                {isLoading ? "Mengirim Laporan..." : "Kirim Laporan"}
                {!isLoading && <ArrowRight size={17} />}
              </motion.button>
            </form>
          </motion.div>

          {/* Sidebar Bagian Kanan */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white border border-slate-200 rounded-3xl p-7 shadow-sm space-y-6"
          >
            <div>
              <h3 className="text-base font-bold text-[#063B4A] mb-4">Sebelum Mengirim</h3>
              <ul className="space-y-3 text-xs text-slate-600">
                <li className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#1597A8]" />
                  <span>Identitas aman</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#1597A8]" />
                  <span>Bisa Anonim</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#1597A8]" />
                  <span>Data terenkripsi</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-[#063B4A] mb-2">Tips:</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Jelaskan kejadian secara kronologis dan sertakan waktu serta lokasi bila memungkinkan.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-base font-bold text-[#063B4A] mb-4">Setelah dikirim:</h3>
              <ul className="space-y-4 text-xs text-slate-600">
                <li className="space-y-1">
                  <div className="flex items-center gap-2 font-bold text-[#063B4A]">
                    <span className="w-2 h-2 rounded-full bg-[#1597A8]" />
                    <span>Laporan diterima</span>
                  </div>
                  <p className="text-[11px] text-slate-500 pl-4">Laporanmu berhasil dikirim dan akan diproses sesuai prosedur.</p>
                </li>
                <li className="space-y-1">
                  <div className="flex items-center gap-2 font-bold text-[#063B4A]">
                    <span className="w-2 h-2 rounded-full bg-[#1597A8]" />
                    <span>Mendapatkan kode tiket</span>
                  </div>
                  <p className="text-[11px] text-slate-500 pl-4">Simpan kode tiket yang muncul setelah laporan berhasil dikirim.</p>
                </li>
                <li className="space-y-1">
                  <div className="flex items-center gap-2 font-bold text-[#063B4A]">
                    <span className="w-2 h-2 rounded-full bg-[#1597A8]" />
                    <span>Pantau perkembangan</span>
                  </div>
                  <p className="text-[11px] text-slate-500 pl-4">Gunakan kode tersebut untuk melihat informasi terbaru mengenai laporan.</p>
                </li>
              </ul>
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}