import { motion } from "motion/react";
import logo from "../assets/logo.png";

const luxuryEase = [0.16, 1, 0.3, 1];

export default function Footer() {
  const footerGroups = [
    {
      title: "PLATFORM",
      links: [
        "Beranda",
        "Fitur Utama",
        "Alur Konseling",
        "Portal Konselor",
      ],
    },
    {
      title: "BANTUAN",
      links: [
        "Pusat FAQ",
        "Panduan Darurat",
        "Kontak Dukungan",
        "Hotline Krisis 24/7",
      ],
    },
    {
      title: "LEGAL",
      links: [
        "Kebijakan Privasi",
        "Syarat & Ketentuan",
        "Standar Keamanan",
        "Kode Etik Konseling",
      ],
    },
  ];

  return (
    <footer className="border-t border-[#DCE8EA] bg-white">

      {/* MAIN FOOTER */}
      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.8,
          ease: luxuryEase,
        }}
        className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr_1fr] lg:px-8"
      >

        {/* BRAND */}
        <div>
          <div className="flex items-center gap-2">
            <motion.div
              whileHover={{
                rotate: -5,
                scale: 1.05,
              }}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 18,
              }}
              className="flex h-8 w-8 items-center justify-center overflow-hidden"
            >
              <img
                src={logo}
                alt="Logo LaporKeun"
                className="h-full w-full object-contain"
              />
            </motion.div>

            <div className="text-sm font-extrabold text-[#063B4A]">
              LaporKeun
              <span className="text-[#1597A8]">!</span>
            </div>
          </div>

          <p className="mt-4 max-w-sm text-[10px] leading-6 text-[#71848A]">
            Platform pelaporan perundungan yang aman,
            terenkripsi, dan anonim. Memberikan ruang
            perlindungan terpercaya untuk siswa.
          </p>
        </div>

        {/* FOOTER LINKS */}
        {footerGroups.map((group) => (
          <div key={group.title}>
            <div className="text-[8px] font-extrabold tracking-[0.14em] text-[#8A9CA1]">
              {group.title}
            </div>

            <div className="mt-4 space-y-2.5">
              {group.links.map((link) => (
                <motion.a
                  key={link}
                  href="#"
                  whileHover={{ x: 3 }}
                  className="block text-[10px] text-[#60757C] transition-colors hover:text-[#1597A8]"
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </div>
        ))}
      </motion.div>

      {/* FOOTER BOTTOM */}
      <div className="border-t border-[#EEF3F4] px-5 py-5 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-[8px] text-[#9AA9AD] sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} LaporKeun!.
            Hak Cipta Dilindungi Undang-Undang.
          </span>

          <span>
            Privasi Dijamin & Terenkripsi End-to-End
          </span>
        </div>
      </div>

    </footer>
  );
}