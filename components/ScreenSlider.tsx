"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MAYITECH_SERVICES, ServiceDetail } from "@/config/services";
import * as Icons from "lucide-react";

export default function ScreenSlider() {
  const [currentScreen, setCurrentScreen] = useState(0); // 0: Hero, 1: Servisler, 2: İletişim, 3: Hakkımızda
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0); 
  const [isAnimating, setIsAnimating] = useState(false);

  // Form State'leri
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [referredModule, setReferredModule] = useState("Genel İletişim / Tümü");
  const [formStatus, setFormStatus] = useState<{ type: "success" | "error" | null; msg: string }>({ type: null, msg: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedService) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isAnimating) return;

      if (e.deltaY > 50 && currentScreen < 3) {
        setIsAnimating(true);
        setCurrentScreen((prev) => prev + 1);
      } else if (e.deltaY < -50 && currentScreen > 0) {
        setIsAnimating(true);
        setCurrentScreen((prev) => prev - 1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentScreen, isAnimating, selectedService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormStatus({ type: null, msg: "" });

    try {
      const res = await fetch("/api/basvuru", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message, selectedModule: referredModule })
      });

      const data = await res.json();
      if (res.ok) {
        setFormStatus({ type: "success", msg: "Bilgileriniz başarıyla kaydedildi! Sizi en kısa sürede arayacağız." });
        setName(""); setPhone(""); setMessage("");
      } else {
        setFormStatus({ type: "error", msg: data.error || "Bir hata oluştu." });
      }
    } catch (err) {
      setFormStatus({ type: "error", msg: "Bağlantı hatası oluştu." });
    } finally {
      setLoading(false);
    }
  };

  return (
    // GENEL ARKA PLAN: Ferah Buz Beyazı (Slate-50) ve Gece Mavisi Yazı Kontrastı
    <div className="relative w-screen h-screen overflow-hidden bg-[#F8FAFC] text-[#0F172A] font-sans select-none">
      
      {/* Sağ Yan Navigasyon Noktaları */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4">
        {[0, 1, 2, 3].map((idx) => (
          <button
            key={idx}
            onClick={() => !isAnimating && !selectedService && (setIsAnimating(true), setCurrentScreen(idx))}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === currentScreen ? "scale-150 bg-[#00B4D8]" : "bg-[#0F172A] opacity-20"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait" onExitComplete={() => setIsAnimating(false)}>
        
        {/* SCREEN 1: HERO */}
        {currentScreen === 0 && (
          <motion.div key="hero" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
            {/* Aydınlık mod için yumuşak teknolojik arka plan süzmesi */}
            <div className="absolute w-[600px] h-[600px] bg-[#00B4D8] opacity-[0.05] blur-[120px] pointer-events-none" />
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 bg-gradient-to-r from-[#0F172A] to-[#475569] bg-clip-text text-transparent">
              May I Tech?
            </h1>
            <h2 className="text-2xl md:text-3xl font-light text-[#334155] max-w-3xl mb-8">
              İşletmeniz için <span className="text-[#0077B6] font-semibold">akılcı</span>, uygun fiyatlı ve <span className="text-[#0077B6] font-semibold">teknolojik</span> çözümler.
            </h2>
            <p className="text-base md:text-lg text-[#64748B] max-w-2xl mb-12 leading-relaxed">
              Günümüzde işinize kolayca değer katın, markanızı görünür yapın, işletmenizi internette var edin.
            </p>
            <button 
              onClick={() => setCurrentScreen(1)} 
              className="px-8 py-4 bg-[#0F172A] text-white font-semibold rounded-full hover:bg-[#00B4D8] hover:shadow-lg hover:shadow-[#00B4D8]/20 transition-all duration-300"
            >
              Çözümlerimizi Keşfedin ↓
            </button>
          </motion.div>
        )}

        {/* SCREEN 2: SERVİSLERİMİZ */}
        {currentScreen === 1 && (
          <motion.div key="services" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full flex flex-col items-center justify-center p-6">
            <h2 className="text-4xl font-extrabold mb-12 text-center tracking-tight text-[#0F172A]">
              İşletmenizi Değiştirecek <span className="text-[#0077B6]">Modüller</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-5 max-w-7xl w-full">
              {MAYITECH_SERVICES.map((service) => {
                const IconComponent = (Icons as any)[service.icon] || Icons.HelpCircle;
                return (
                  <div
                    key={service.id}
                    onClick={() => { setSelectedService(service); setActiveImageIdx(0); }}
                    className="p-6 bg-white border border-slate-200/60 rounded-2xl cursor-pointer hover:border-[#00B4D8] hover:-translate-y-2 hover:shadow-xl hover:shadow-slate-200/80 transition-all duration-300 flex flex-col justify-between h-[290px] group shadow-sm shadow-slate-100/50"
                  >
                    <div>
                      {/* Açık gri ikon alanı, hover olunca soft turkuaz rengine döner */}
                      <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 text-[#475569] group-hover:bg-[#EEF2F6] group-hover:text-[#0077B6] transition-colors">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-[#1E293B] mb-2 group-hover:text-[#0077B6] transition-colors">{service.title}</h3>
                      <p className="text-xs text-[#64748B] line-clamp-4 font-light leading-relaxed">{service.shortDesc}</p>
                    </div>
                    <span className="text-xs text-[#0077B6] font-semibold flex items-center gap-1">
                      Detayları Gör →
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* SCREEN 3: İLETİŞİM */}
        {currentScreen === 2 && (
          <motion.div key="contact" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} className="w-full h-full flex flex-col items-center justify-center p-6 max-w-md mx-auto">
            <div className="w-full p-8 bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-100/70">
              <h3 className="text-2xl font-bold text-[#1E293B] mb-1">Sizi Arayalım</h3>
              <p className="text-xs text-[#64748B] mb-6">Seçilen Hizmet: <span className="text-[#0077B6] font-semibold">{referredModule}</span></p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" required placeholder="Adınız veya İşletme Adı" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#00B4D8] focus:bg-white transition-all" />
                <input type="tel" required placeholder="Telefon Numaranız" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#00B4D8] focus:bg-white transition-all" />
                <textarea placeholder="Sorularınız veya istekleriniz..." value={message} onChange={(e) => setMessage(e.target.value)} rows={3} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#00B4D8] focus:bg-white transition-all resize-none" />
                
                <button type="submit" disabled={loading} className="w-full py-4 bg-[#0F172A] text-white font-bold rounded-xl text-sm hover:bg-[#00B4D8] transition-colors disabled:opacity-50 shadow-md">
                  {loading ? "Kaydediliyor..." : "İletişime Geçin"}
                </button>
                
                {formStatus.type && (
                  <p className={`text-xs text-center font-semibold mt-2 ${formStatus.type === "success" ? "text-[#16A34A]" : "text-[#DC2626]"}`}>
                    {formStatus.msg}
                  </p>
                )}
              </form>
            </div>
          </motion.div>
        )}

        {/* SCREEN 4: HAKKIMIZDA */}
        {currentScreen === 3 && (
          <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full flex flex-col items-center justify-center p-6 text-center max-w-4xl mx-auto">
            <h2 className="text-4xl font-extrabold mb-6 tracking-tight text-[#0F172A]">MayITech Ailesi</h2>
            <p className="text-lg text-[#475569] font-light leading-relaxed mb-10 max-w-3xl">
              Biz, sizler için kişisel isteklerinize uygun, sizin ve müşterilerinizin tüm ihtiyaçlarını gözeterek günümüz teknolojilerini ayağınıza getiriyoruz. Küçük ve orta ölçekli işletmelerin dijital dönüşüm süreçlerinde en güvenilir yol arkadaşınız olmak için buradayız.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm shadow-slate-100">
                <h4 className="text-[#0077B6] font-bold mb-2 flex items-center gap-2"><Icons.Sparkles className="w-4 h-4"/> Kişisel İstekler</h4>
                <p className="text-xs text-[#64748B] font-light leading-relaxed">İşletmenize tam uyum sağlayacak özel modifikasyonlar ve dinamik tasarımlar geliştiriyoruz.</p>
              </div>
              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm shadow-slate-100">
                <h4 className="text-[#0077B6] font-bold mb-2 flex items-center gap-2"><Icons.Cpu className="w-4 h-4"/> Gelişmiş Altyapı</h4>
                <p className="text-xs text-[#64748B] font-light leading-relaxed">Next.js ve modern bulut mimarileriyle ışık hızında çalışan, güvenli ve ölçeklenebilir sistemler.</p>
              </div>
              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm shadow-slate-100">
                <h4 className="text-[#0077B6] font-bold mb-2 flex items-center gap-2"><Icons.PhoneCall className="w-4 h-4"/> Kesintisiz Destek</h4>
                <p className="text-xs text-[#64748B] font-light leading-relaxed">Kurulum aşamasında ve sonrasındaki tüm operasyonel süreçlerinizde her zaman yanınızdayız.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DETAYLI İÇ MODAL & YATAY GÖRSEL GALERİSİ */}
      <AnimatePresence>
        {selectedService && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#0F172A]/30 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="bg-white border border-slate-200 max-w-4xl w-full rounded-3xl p-6 md:p-10 relative shadow-2xl flex flex-col md:flex-row gap-8 text-[#1E293B]">
              
              {/* Kapatma Butonu */}
              <button onClick={() => setSelectedService(null)} className="absolute right-4 top-4 w-10 h-10 rounded-full bg-slate-100 text-[#475569] flex items-center justify-center hover:bg-slate-200 transition-colors z-20">
                <Icons.X className="w-5 h-5" />
              </button>

              {/* SOL TARAF: AYDINLIK YATAY RESİM GEÇİŞ ALANI */}
              <div className="flex-1 flex flex-col justify-center items-center bg-slate-50 rounded-2xl p-4 border border-slate-200/60 min-h-[250px] relative">
                {selectedService.images && selectedService.images.length > 0 ? (
                  <div className="w-full h-full flex flex-col items-center justify-center relative">
                    <div className="w-full h-44 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-xs text-slate-400 overflow-hidden relative shadow-sm">
                      <img 
                        src={selectedService.images[activeImageIdx]} 
                        alt={`${selectedService.title} Arayüz`} 
                        className="object-cover w-full h-full"
                        onError={(e)=>{e.currentTarget.style.display='none'}}
                      />
                      <span className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50 font-light p-4 text-center">
                        [Ekran Görüntüsü Yolu: {selectedService.images[activeImageIdx]}]
                      </span>
                    </div>

                    {/* Yatay Geçiş Okları */}
                    {selectedService.images.length > 1 && (
                      <div className="flex gap-4 mt-4">
                        <button 
                          onClick={() => setActiveImageIdx(prev => prev > 0 ? prev - 1 : selectedService.images.length - 1)}
                          className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 text-[#475569] transition-colors"
                        >
                          <Icons.ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-xs text-[#64748B] self-center font-medium">{activeImageIdx + 1} / {selectedService.images.length}</span>
                        <button 
                          onClick={() => setActiveImageIdx(prev => prev < selectedService.images.length - 1 ? prev + 1 : 0)}
                          className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 text-[#475569] transition-colors"
                        >
                          <Icons.ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <span className="text-xs text-slate-400 font-light">Görsel Alanı</span>
                )}
              </div>

              {/* SAĞ TARAF: DETAYLI ANLATIM METİNLERİ */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-[#0077B6] font-bold tracking-wider block mb-1 uppercase">Modül Detayı</span>
                  <h3 className="text-2xl font-black text-[#0F172A] mb-4">{selectedService.title}</h3>
                  <p className="text-[#475569] text-xs md:text-sm font-light leading-relaxed mb-6">{selectedService.longDesc}</p>

                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="text-xs font-semibold text-[#334155] mb-2 flex items-center gap-1">
                        <Icons.Sliders className="w-3.5 h-3.5 text-[#0077B6]" /> Yetenekler ve Özellikler
                      </h4>
                      <ul className="space-y-1.5 text-xs font-light text-[#475569]">
                        {selectedService.features.map((feat, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <Icons.Check className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                      <span className="text-[#64748B]">⚡ Aktivasyon ve Kurulum Süresi:</span>
                      <span className="font-bold text-[#0077B6]">{selectedService.setupTime}</span>
                    </div>
                  </div>
                </div>

                {/* Alt Aksiyon Alanı */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="text-[10px] text-[#94A3B8] font-medium">14 Gün Demo • İstediğin An İptal Et</span>
                  <button
                    onClick={() => {
                      setReferredModule(selectedService.title);
                      setSelectedService(null);
                      setCurrentScreen(2); // Form sayfasına uçurur
                    }}
                    className="px-5 py-2.5 bg-[#0F172A] text-white font-bold rounded-xl text-xs hover:bg-[#00B4D8] transition-colors shadow-sm"
                  >
                    {selectedService.ctaText} →
                  </button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}