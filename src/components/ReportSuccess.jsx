import React, { useState } from "react";
import { motion } from "motion/react";
import { Check, Copy, ArrowLeft, ExternalLink, Smartphone } from "lucide-react";
import successIllustration from "../assets/illustrations/success.png"; 

export default function ReportSuccess({ ticketCode, onBackHome, onDetail }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(ticketCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const text = `Halo, saya telah membuat laporan di LaporKeun! dengan Kode Tiket: ${ticketCode}. Mohon bantuannya untuk memantau laporan ini.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

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
          src={successIllustration}
          alt="laporan berhasil"
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
            Laporan Berhasil Dikirim
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed mb-8">
            Laporanmu telah berhasil diterima. Simpan kode tiket berikut untuk memantau perkembangannya.
          </p>

          {/* Input Kode Tiket */}
          <div className="space-y-2 mb-6">
            <label className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Kode Tiket Kamu
            </label>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center">
                <span className="font-mono font-bold text-lg text-[#1597A8] tracking-widest">{ticketCode}</span>
              </div>
              <button
                onClick={handleCopy}
                className="h-12 px-6 rounded-xl bg-[#063B4A] text-white text-sm font-semibold hover:bg-[#032D39] transition-colors flex items-center gap-2"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? "Tersalin" : "Salin"}
              </button>
            </div>
          </div>

          <button
            onClick={handleWhatsAppShare}
            className="w-full h-12 mb-10 rounded-xl bg-[#1597A8]/10 text-[#1597A8] text-sm font-semibold hover:bg-[#1597A8]/20 transition-colors flex items-center justify-center gap-2"
          >
            <Smartphone size={18} />
            Kirim Link Akses via WhatsApp
          </button>

          {/* Timeline Status */}
          <div className="mb-10">
            <h3 className="text-sm font-bold text-[#063B4A] mb-5">Status Laporan</h3>
            <div className="relative pl-4 space-y-6 border-l-2 border-slate-100 ml-2">
              
              <div className="relative">
                <div className="absolute -left-5.25 top-0 w-4 h-4 rounded-full border-4 border-white bg-[#063B4A] shadow-sm" />
                <h4 className="text-sm font-bold text-[#063B4A]">Laporan diterima</h4>
              </div>

              <div className="relative">
                <div className="absolute -left-5.25 top-0 w-4 h-4 rounded-full border-4 border-white bg-slate-200" />
                <h4 className="text-sm font-medium text-slate-400">Sedang ditinjau</h4>
              </div>

              <div className="relative">
                <div className="absolute -left-5.25 top-0 w-4 h-4 rounded-full border-4 border-white bg-slate-200" />
                <h4 className="text-sm font-medium text-slate-400">Dalam proses tindak lanjut</h4>
              </div>

              <div className="relative">
                <div className="absolute -left-5.25 top-0 w-4 h-4 rounded-full border-4 border-white bg-slate-200" />
                <h4 className="text-sm font-medium text-slate-400">Selesai</h4>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-xs text-slate-500 leading-relaxed">
                <span className="font-bold text-[#063B4A]">Status saat ini:</span> Laporan telah diterima dan menunggu proses peninjauan oleh tim terkait.
              </p>
            </div>
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
              onClick={onDetail}
              className="w-full sm:flex-1 h-12 rounded-xl bg-[#063B4A] text-white text-sm font-semibold hover:bg-[#032D39] transition-colors flex items-center justify-center gap-2"
            >
              Lihat Detail <ExternalLink size={16} />
            </button>
          </div>

        </motion.div>
      </div>
    </div>
  );
}