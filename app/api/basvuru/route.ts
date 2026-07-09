import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, message, selectedModule } = body;

    // Basit bir validation (Doğrulama)
    if (!name || !phone) {
      return NextResponse.json({ error: "Ad ve telefon alanları zorunludur." }, { status: 400 });
    }

    // Gelen veriyi bir obje haline getiriyoruz (Zaman damgası ekleyerek)
    const yeniBasvuru = {
      id: Date.now().toString(),
      isim: name,
      telefon: phone,
      mesaj: message || "Mesaj bırakılmadı.",
      basvurulanModul: selectedModule || "Genel İletişim / Tümü",
      tarih: new Date().toISOString()
    };

    // Proje içinde 'basvurular.json' dosyasına kaydedeceğiz
    const filePath = path.join(process.cwd(), "basvurular.json");
    
    let mevcutBasvurular = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf-8");
      mevcutBasvurular = JSON.parse(fileData);
    }

    // Yeni başvuruyu listenin en başına ekle
    mevcutBasvurular.unshift(yeniBasvuru);

    // Dosyayı güncelle
    fs.writeFileSync(filePath, JSON.stringify(mevcutBasvurular, null, 2), "utf-8");

    return NextResponse.json({ success: true, message: "Başvurunuz başarıyla kaydedildi!" });

  } catch (error) {
    return NextResponse.json({ error: "Sunucu hatası oluştu." }, { status: 500 });
  }
}