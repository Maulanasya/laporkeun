import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";

import logoImage from "../assets/logo.png";

const NAV_LINKS = [
  { id: "beranda", label: "Beranda" },
  { id: "fitur", label: "Fitur" },
  { id: "cara-kerja", label: "Cara Kerja" },
  { id: "faq", label: "FAQ" },
];

const SECTION_IDS = ["fitur", "cara-kerja", "faq"];

const SPRING = { type: "spring", stiffness: 380, damping: 30 };
const EASE_OUT = [0.22, 1, 0.36, 1];

function DesktopNavLink({
  label,
  isActive,
  isHovered,
  onClick,
  onHover,
  onLeave,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onHover}
      onFocus={onHover}
      onBlur={onLeave}
      aria-current={isActive ? "true" : undefined}
      className={`
        relative
        px-4
        py-2
        rounded-full
        text-sm
        font-medium
        cursor-pointer
        transition-colors
        duration-300
        ${
          isActive
            ? "text-brand-tertiary"
            : "text-slate-600 hover:text-brand-tertiary"
        }
      `}
    >
      {isHovered && (
        <motion.span
          layoutId="nav-hover"
          transition={SPRING}
          className="absolute inset-0 rounded-full bg-slate-100"
        />
      )}

      <span className="relative z-10">{label}</span>

      {isActive && (
        <motion.span
          layoutId="nav-active"
          transition={SPRING}
          className="absolute left-4 right-4 bottom-1 z-10 h-0.5 rounded-full bg-brand-tertiary"
        />
      )}
    </button>
  );
}

function MobileNavLink({ label, isActive, index, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, x: -12 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.3,
          delay: index * 0.05,
          ease: EASE_OUT,
        },
      }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative
        w-full
        text-left
        px-4
        py-3
        rounded-xl
        text-sm
        font-medium
        cursor-pointer
        transition-colors
        duration-300
        ${
          isActive
            ? "bg-cyan-50 text-brand-tertiary"
            : "text-slate-600 hover:bg-slate-50 hover:text-brand-tertiary"
        }
      `}
    >
      {isActive && (
        <motion.span
          layoutId="mobile-nav-active"
          transition={SPRING}
          className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-full bg-brand-tertiary"
        />
      )}

      {label}
    </motion.button>
  );
}

function CtaButton({ label, onClick, mobile = false }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={`
        group
        inline-flex
        items-center
        justify-center
        gap-2
        px-5
        py-3
        bg-brand-tertiary
        text-white
        text-sm
        font-semibold
        shadow-md
        shadow-cyan-900/10
        hover:bg-brand-tertiaryHover
        hover:shadow-lg
        cursor-pointer
        transition-[background-color,box-shadow]
        duration-300
        ${mobile ? "w-full rounded-xl" : "rounded-full"}
      `}
    >
      {label}
      <ArrowRight
        size={16}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </motion.button>
  );
}

function OutlineButton({ label, onClick, mobile = false }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={`
        text-sm
        font-semibold
        text-brand-primary
        border
        border-slate-200
        hover:bg-slate-50
        hover:border-brand-tertiary
        hover:text-brand-tertiary
        cursor-pointer
        transition-[background-color,border-color,color]
        duration-300
        ${mobile ? "w-full px-4 py-3 rounded-xl" : "px-5 py-2.5 rounded-full"}
      `}
    >
      {label}
    </motion.button>
  );
}

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeId, setActiveId] = useState("beranda");
  const [hoveredId, setHoveredId] = useState(null);

  const isAutoScrolling = useRef(false);
  const autoScrollTimer = useRef(null);

  const pathname = window.location.pathname;

  const isRegisterPage = pathname === "/register";
  const isHomePage = pathname === "/";
  const hasMenu = isHomePage || isRegisterPage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (!isHomePage || isAutoScrolling.current) return;

      let current = "beranda";

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);

        if (el && el.getBoundingClientRect().top <= 120) {
          current = id;
        }
      }

      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;

      if (isAtBottom && window.scrollY > 200) {
        current = SECTION_IDS[SECTION_IDS.length - 1];
      }

      setActiveId(current);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHomePage]);

  useEffect(() => {
    return () => clearTimeout(autoScrollTimer.current);
  }, []);

  const lockActive = (id) => {
    setActiveId(id);
    isAutoScrolling.current = true;
    clearTimeout(autoScrollTimer.current);

    autoScrollTimer.current = setTimeout(() => {
      isAutoScrolling.current = false;
    }, 900);
  };

  const goToHome = () => {
    setIsMobileOpen(false);

    setTimeout(() => {
      if (pathname === "/") {
        lockActive("beranda");
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        return;
      }

      window.location.href = "/";
    }, 150);
  };

  const goToLogin = () => {
    setIsMobileOpen(false);

    if (pathname === "/login") {
      return;
    }

    window.location.href = "/login";
  };

  const goToRegister = () => {
    setIsMobileOpen(false);

    if (pathname === "/register") {
      return;
    }

    window.location.href = "/register";
  };

  const scrollToSection = (sectionId) => {
    setIsMobileOpen(false);

    setTimeout(() => {
      if (pathname !== "/") {
        sessionStorage.setItem("scrollTarget", sectionId);
        window.location.href = "/";
        return;
      }

      const section = document.getElementById(sectionId);

      if (!section) return;

      lockActive(sectionId);

      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 150);
  };

  const handleNavClick = (id) => {
    if (id === "beranda") {
      goToHome();
      return;
    }

    scrollToSection(id);
  };

  useEffect(() => {
    if (pathname !== "/") return;

    const target = sessionStorage.getItem("scrollTarget");

    if (!target) return;

    sessionStorage.removeItem("scrollTarget");

    const scrollTimer = setTimeout(() => {
      const section = document.getElementById(target);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 200);

    return () => clearTimeout(scrollTimer);
  }, [pathname]);

  return (
    <MotionConfig reducedMotion="user">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className={`
          fixed
          top-0
          left-0
          right-0
          z-50
          transition-[background-color,box-shadow,backdrop-filter]
          duration-300
          ${
            isScrolled
              ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-slate-100"
              : "bg-white border-b border-slate-100"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-[78px] flex items-center justify-between">
            
            {/* Logo Component */}
            <motion.button
              type="button"
              onClick={goToHome}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="
                flex
                items-center
                gap-3
                group
                cursor-pointer
                shrink-0
              "
              aria-label="Kembali ke Beranda"
            >
              <div
                className="
                  w-10
                  h-10
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  overflow-hidden
                  transition-all
                  duration-300
                  group-hover:scale-105
                "
              >
                <img
                  src={logoImage}
                  alt="Logo LaporKeun"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="text-left leading-none">
                <div className="text-[15px] font-bold text-brand-primary">
                  LaporKeun!
                </div>
              </div>
            </motion.button>

            {/* Landing Page Desktop Navigation */}
            {isHomePage && (
              <>
                <div
                  className="hidden md:flex items-center gap-1"
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {NAV_LINKS.map((link) => (
                    <DesktopNavLink
                      key={link.id}
                      label={link.label}
                      isActive={activeId === link.id}
                      isHovered={hoveredId === link.id}
                      onClick={() => handleNavClick(link.id)}
                      onHover={() => setHoveredId(link.id)}
                      onLeave={() => setHoveredId(null)}
                    />
                  ))}
                </div>

                <div className="hidden md:flex items-center gap-3">
                  <OutlineButton label="Masuk" onClick={goToLogin} />
                  <CtaButton label="Daftar" onClick={goToRegister} />
                </div>
              </>
            )}

            {/* Register Desktop Navigation */}
            {isRegisterPage && (
              <div className="hidden md:flex items-center gap-3">
                <span className="text-sm text-slate-500">
                  Sudah punya akun?
                </span>
                <CtaButton label="Masuk" onClick={goToLogin} />
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            {hasMenu && (
              <motion.button
                type="button"
                onClick={() => setIsMobileOpen((prev) => !prev)}
                whileTap={{ scale: 0.92 }}
                className="
                  md:hidden
                  w-10
                  h-10
                  rounded-xl
                  border
                  border-slate-200
                  flex
                  items-center
                  justify-center
                  text-brand-primary
                  hover:bg-slate-50
                  transition-colors
                  cursor-pointer
                "
                aria-label={isMobileOpen ? "Tutup menu" : "Buka menu"}
                aria-expanded={isMobileOpen}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={isMobileOpen ? "close" : "open"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex"
                  >
                    {isMobileOpen ? <X size={21} /> : <Menu size={21} />}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            )}

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileOpen && hasMenu && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              className="
                md:hidden
                overflow-hidden
                border-t
                border-slate-100
                bg-white
                shadow-lg
              "
            >
              <div className="px-6 py-5 space-y-2">
                {isHomePage && (
                  <>
                    {NAV_LINKS.map((link, index) => (
                      <MobileNavLink
                        key={link.id}
                        label={link.label}
                        index={index}
                        isActive={activeId === link.id}
                        onClick={() => handleNavClick(link.id)}
                      />
                    ))}

                    <div className="pt-2 border-t border-slate-100 mt-3 space-y-2">
                      <OutlineButton
                        mobile
                        label="Masuk"
                        onClick={goToLogin}
                      />
                      <CtaButton
                        mobile
                        label="Daftar"
                        onClick={goToRegister}
                      />
                    </div>
                  </>
                )}

                {isRegisterPage && (
                  <>
                    <div className="px-4 py-2">
                      <p className="text-xs text-slate-500">
                        Sudah punya akun?
                      </p>
                    </div>
                    <CtaButton
                      mobile
                      label="Masuk"
                      onClick={goToLogin}
                    />
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </MotionConfig>
  );
}