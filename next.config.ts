import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // GitHub Pages'in Next.js sitesini ücretsiz çalıştırabilmesi için bu satır şarttır!
  images: {
    unoptimized: true, // Görsellerin sunucu olmadan mobilde de hatasız yüklenmesi için ekle
  },
};

export default nextConfig;