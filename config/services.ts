export interface ServiceDetail {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  features: string[];
  ctaText: string;
  icon: string;
  setupTime: string; 
  images: string[]; 
}

export const MAYITECH_SERVICES: ServiceDetail[] = [
  {
    id: "rezervasyon",
    title: "Akıllı Rezervasyon Sistemleri",
    shortDesc: "Müşterileriniz ve sizin için rezervasyon işlemlerinizi kolaylaştırın, tek tuşla sıranızı alın.",
    longDesc: "Güzellik merkezleri, berberler ve klinikler için randevu karmaşasına son veriyoruz. Bilgisayarınıza ve telefonunuza saniyeler içinde kolayca kurulur. Yapay zeka destekli altyapısıyla müşterilerinize otomatik hatırlatmalar gönderir.",
    features: ["Tek Tuşla Rezervasyon Takibi", "Otomatik Sıra ve Randevu Yönetimi", "SMS / WhatsApp Hatırlatma Entegrasyonu"],
    ctaText: "14 Gün Ücretsiz Deneyin",
    icon: "Calendar",
    setupTime: "5 Dakika",
    images: ["/images/shine_islem_secimi.png", "/images/shine_randevu_kayit.png","/images/shine_admin.png",] 
  },
  {
    id: "kasa",
    title: "Kasa & POS İşlemleri",
    shortDesc: "Kasa, POS ve barkod sistemleriyle ödemelerinizi ve satışlarınızı anlık kontrol edin.",
    longDesc: "İşletmenizin sıcak para akışını ve satış analizlerini tek ekrandan yönetin. Karmaşık ERP sistemleri yerine esnaf dostu, hızlı barkod okuma ve pratik ön muhasebe arayüzü sunuyoruz.",
    features: ["Hızlı POS ve Barkod Entegrasyonu", "Anlık Ciro ve Kar Analizleri", "Veresiye ve Cari Takip Sistemi"],
    ctaText: "Hemen Demoyu İnceleyin",
    icon: "CreditCard",
    setupTime: "10 Dakika",
    images: ["/images/kasa-1.png", "/images/kasa-2.png"]
  },
  {
    id: "web-tasarim",
    title: "Web Sitesi Tasarımı",
    shortDesc: "İnternette görünür olun. İşletmenizin ruhunu yansıtan modern web tasarımları.",
    longDesc: "Günümüzde teknolojiyi işletmenize adapte etmenin ilk adımı dijital dünyada var olmaktır. Sizi arayan müşterilerin doğrudan karşısına çıkacağınız, SEO uyumlu ve mobil öncelikli harika web siteleri tasarlıyoruz.",
    features: ["Google (SEO) Arama Uyumluluğu", "Modern, Animasyonlu Tasarımlar", "Kolay Yönetim Paneli"],
    ctaText: "Markanızı İnternete Taşıyın",
    icon: "Globe",
    setupTime: "48 Saat",
    images: ["/images/web-1.png"]
  },
  {
    id: "stok",
    title: "Akıllı Stok Yönetim Sistemleri",
    shortDesc: "Stoklarınızı kolayca girin, takip edin ve geleceğe yönelik akıllı analizlerine ulaşın.",
    longDesc: "Eksilen ürünleri tahmin eden, toptancı sipariş süreçlerinizi kolaylaştıran dijital ambarınız. Stok durumunuz kritik seviyeye düştüğünde sistem sizi anında uyarır, zarar etmenizi engeller.",
    features: ["Kolay Ürün Girişi ve Barkodlama", "Kritik Stok Seviyesi Uyarıları", "Gelişmiş Stok Grafikleri ve Analizler"],
    ctaText: "Stoklarınızı Dijitalleştirin",
    icon: "Package",
    setupTime: "15 Dakika",
    images: ["/images/stok-1.png"]
  },
  {
    id: "musteri-takip",
    title: "Müşteri & Hasta Takip Sistemleri",
    shortDesc: "Müşterilerinizi kalıcı hale getirin, onlara özel kişisel bir deneyim yaşatın.",
    longDesc: "Hastalarınız, müşterileriniz veya sevimli pet hayvanı dostlarınız için kusursuz arşivleme sistemi. Bilgilerini güvenle saklayın, geçmiş işlemlerini görün ve özel kampanyalarınızdan ilk onlar haberdar edin.",
    features: ["Kişisel Geçiş Bilgisi ve Arşivleme", "Müşteri Sadakat ve Kampanya Modülü", "Klinik / Pet / İşletme Özel Şablonları"],
    ctaText: "Müşteri Bağınızı Güçlendirin",
    icon: "Users",
    setupTime: "5 Dakika",
    images: ["/images/musteri-1.png"]
  }
];