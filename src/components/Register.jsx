import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Eye,
  EyeOff,
  Check,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import registerIllustration from "../assets/illustrations/register.png";

const KELAS_GROUPS = [
  {
    label: "SMP",
    options: ["Kelas 7", "Kelas 8", "Kelas 9"],
  },
  {
    label: "SMA / SMK",
    options: ["Kelas 10", "Kelas 11", "Kelas 12"],
  },
];

const KELAS_FLAT = KELAS_GROUPS.flatMap((group) =>
  group.options.map((option) => ({
    value: option,
    jenjang: group.label,
  }))
);

const INPUT_BASE =
  "w-full h-12 pl-4 rounded-xl border bg-slate-50/70 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all focus:bg-white focus:ring-4";

const INPUT_OK =
  "border-slate-200 focus:border-[#1597A8] focus:ring-[#1597A8]/10";

const INPUT_ERROR =
  "border-red-300 focus:border-red-400 focus:ring-red-400/10";

const inputClass = (hasError, padRight = "pr-4") =>
  `${INPUT_BASE} ${padRight} ${hasError ? INPUT_ERROR : INPUT_OK}`;

function Field({ id, label, error, children }) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-xs font-semibold text-[#17343D]"
      >
        {label}
      </label>
      <div className="relative">{children}</div>
      {error && (
        <p id={`${id}-error`} className="text-[11px] text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

function KelasSelect({ value, onSelect, hasError, describedBy }) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const wrapperRef = useRef(null);
  const triggerRef = useRef(null);

  const selected = KELAS_FLAT.find((item) => item.value === value);

  useEffect(() => {
    if (!open) return;

    const handleOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
    };
  }, [open]);

  useEffect(() => {
    if (!open || activeIndex < 0) return;

    document
      .getElementById(`kelas-option-${activeIndex}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  const openList = () => {
    const selectedIndex = KELAS_FLAT.findIndex(
      (item) => item.value === value
    );

    setActiveIndex(Math.max(0, selectedIndex));
    setOpen(true);
  };

  const choose = (item) => {
    onSelect(item.value);
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
        setActiveIndex((i) => (i + 1) % KELAS_FLAT.length);
        break;

      case "ArrowUp":
        e.preventDefault();
        setActiveIndex(
          (i) => (i - 1 + KELAS_FLAT.length) % KELAS_FLAT.length
        );
        break;

      case "Home":
        e.preventDefault();
        setActiveIndex(0);
        break;

      case "End":
        e.preventDefault();
        setActiveIndex(KELAS_FLAT.length - 1);
        break;

      case "Enter":
      case " ":
        e.preventDefault();
        if (activeIndex >= 0) {
          choose(KELAS_FLAT[activeIndex]);
        }
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
        id="kelas"
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="kelas-listbox"
        aria-invalid={hasError}
        aria-describedby={describedBy}
        aria-activedescendant={
          open && activeIndex >= 0
            ? `kelas-option-${activeIndex}`
            : undefined
        }
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={handleKeyDown}
        className={`w-full h-12 px-4 rounded-xl border text-sm flex items-center justify-between gap-3 text-left cursor-pointer outline-none transition-all ${triggerStyle}`}
      >
        <span className="flex items-center gap-2 min-w-0">
          {selected ? (
            <>
              <span className="font-medium text-slate-700">
                {selected.value}
              </span>
              <span className="text-[10px] font-bold tracking-wide text-[#1597A8] bg-cyan-50 border border-cyan-100 px-2 py-0.5 rounded-full">
                {selected.jenjang}
              </span>
            </>
          ) : (
            <span className="text-slate-400">Pilih kelas</span>
          )}
        </span>

        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className={`flex shrink-0 ${
            open ? "text-[#1597A8]" : "text-slate-400"
          }`}
        >
          <ChevronDown size={17} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="kelas-listbox"
            role="listbox"
            aria-label="Pilih kelas"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "top" }}
            onMouseDown={(e) => e.preventDefault()}
            className="absolute left-0 right-0 top-full mt-2 z-30 max-h-[320px] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_24px_60px_-20px_rgba(6,59,74,0.28)]"
          >
            {KELAS_GROUPS.map((group) => (
              <div
                key={group.label}
                role="group"
                aria-label={group.label}
                className="mt-1 pt-1 border-t border-slate-100 first:mt-0 first:pt-0 first:border-0"
              >
                <p className="px-3 pt-2 pb-1 text-[10px] font-bold tracking-[0.14em] uppercase text-slate-400">
                  {group.label}
                </p>

                {group.options.map((option) => {
                  const index = KELAS_FLAT.findIndex(
                    (item) => item.value === option
                  );

                  const isSelected = option === value;
                  const isActive = index === activeIndex;

                  return (
                    <div
                      key={option}
                      id={`kelas-option-${index}`}
                      role="option"
                      aria-selected={isSelected}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => choose(KELAS_FLAT[index])}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm cursor-pointer transition-colors ${
                        isActive ? "bg-cyan-50" : ""
                      } ${
                        isSelected
                          ? "font-semibold text-[#063B4A]"
                          : "font-medium text-slate-600"
                      }`}
                    >
                      <span>{option}</span>
                      {isSelected && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 25,
                          }}
                          className="w-5 h-5 rounded-full bg-[#1597A8] text-white flex items-center justify-center"
                        >
                          <Check size={12} strokeWidth={3} />
                        </motion.span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const validate = (form) => {
  const errors = {};

  if (!/^\d{10}$/.test(form.nisn)) {
    errors.nisn = "NISN harus terdiri dari 10 digit angka.";
  }

  if (!form.nama.trim()) {
    errors.nama = "Nama lengkap wajib diisi.";
  }

  if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
    errors.email = "Masukkan alamat email yang valid.";
  }

  if (!form.kelas) {
    errors.kelas = "Silakan pilih kelas.";
  }

  if (form.password.length < 8) {
    errors.password = "Password minimal 8 karakter.";
  }

  return errors;
};

export default function Register() {
  const [form, setForm] = useState({
    nisn: "",
    nama: "",
    email: "",
    kelas: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const setField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (serverError) setServerError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setField(
      name,
      name === "nisn" ? value.replace(/\D/g, "").slice(0, 10) : value
    );
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setServerError("");

    const found = validate(form);
    setErrors(found);

    const firstKey = Object.keys(found)[0];

    if (firstKey) {
      document.getElementById(firstKey)?.focus();
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nisn: form.nisn,
          nama_lengkap: form.nama,
          email: form.email,
          kelas: form.kelas,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setServerError(data.message || "Gagal melakukan registrasi.");
        setIsLoading(false);
        return;
      }

      alert("Registrasi berhasil! Silakan masuk.");
      window.location.href = "/login";
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      setServerError("Tidak dapat terhubung ke server backend.");
      setIsLoading(false);
    }
  };

  const goToLogin = () => {
    window.location.href = "/login";
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
                src={registerIllustration}
                alt="Ilustrasi Daftar LaporKeun"
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
                    Gratis untuk Siswa
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Data aman & terenkripsi
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
                        Buat Akun Baru
                      </h1>
                      <p className="text-sm text-slate-500 leading-relaxed mt-3 max-w-md">
                        Daftar untuk membuat laporan, memantau perkembangan,
                        dan mendapatkan dukungan dengan aman.
                      </p>
                    </div>
                  </div>

                  {serverError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2.5 text-red-600 text-xs font-medium"
                    >
                      <AlertCircle size={16} className="shrink-0" />
                      <span>{serverError}</span>
                    </motion.div>
                  )}

                  <form
                    onSubmit={handleRegister}
                    noValidate
                    className="space-y-4"
                  >
                    <Field id="nisn" label="NISN" error={errors.nisn}>
                      <input
                        id="nisn"
                        name="nisn"
                        type="text"
                        inputMode="numeric"
                        autoComplete="off"
                        value={form.nisn}
                        onChange={handleChange}
                        placeholder="Masukkan NISN (10 digit)"
                        aria-invalid={!!errors.nisn}
                        aria-describedby={
                          errors.nisn ? "nisn-error" : undefined
                        }
                        className={inputClass(!!errors.nisn)}
                      />
                    </Field>

                    <Field
                      id="nama"
                      label="Nama Lengkap"
                      error={errors.nama}
                    >
                      <input
                        id="nama"
                        name="nama"
                        type="text"
                        autoComplete="name"
                        value={form.nama}
                        onChange={handleChange}
                        placeholder="Masukkan nama lengkap"
                        aria-invalid={!!errors.nama}
                        aria-describedby={
                          errors.nama ? "nama-error" : undefined
                        }
                        className={inputClass(!!errors.nama)}
                      />
                    </Field>

                    <Field id="email" label="Email" error={errors.email}>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Masukkan email kamu"
                        aria-invalid={!!errors.email}
                        aria-describedby={
                          errors.email ? "email-error" : undefined
                        }
                        className={inputClass(!!errors.email)}
                      />
                    </Field>

                    <Field id="kelas" label="Kelas" error={errors.kelas}>
                      <KelasSelect
                        value={form.kelas}
                        onSelect={(value) => setField("kelas", value)}
                        hasError={!!errors.kelas}
                        describedBy={
                          errors.kelas ? "kelas-error" : undefined
                        }
                      />
                    </Field>

                    <Field
                      id="password"
                      label="Password"
                      error={errors.password}
                    >
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Buat password (min. 8 karakter)"
                        aria-invalid={!!errors.password}
                        aria-describedby={
                          errors.password ? "password-error" : undefined
                        }
                        className={inputClass(!!errors.password, "pr-12")}
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
                    </Field>

                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      whileHover={{
                        scale: 1.01,
                        boxShadow:
                          "0 14px 30px -10px rgba(21,151,168,0.45)",
                      }}
                      whileTap={{
                        scale: 0.985,
                      }}
                      className="w-full h-12 mt-2 rounded-xl bg-[#063B4A] text-white text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors hover:bg-[#032D39] disabled:opacity-50"
                    >
                      {isLoading ? "Memproses..." : "Daftar"}
                      {!isLoading && <ArrowRight size={17} />}
                    </motion.button>
                  </form>

                  <div className="mt-7 pt-6 border-t border-slate-100 text-center">
                    <p className="text-xs text-slate-500">
                      Sudah punya akun?
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
                  <ShieldCheck
                    size={14}
                    className="text-[#1597A8]"
                  />
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