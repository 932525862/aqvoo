import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { LangProvider } from "@/components/LangProvider";
import { CartProvider } from "@/components/Cart";

export const metadata: Metadata = {
  title: "Aqvo — halol mol go‘shti, O‘zbekiston bo‘ylab yetkazib berish",
  description: "Aqvo: sifatli halol mol go‘shti 14 ta bo‘limga ajratilgan holda, vakuum qadoqda O‘zbekiston bo‘ylab yetkazib beriladi.",
};
export const viewport: Viewport = { themeColor: "#120607" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@500;700;900&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <SmoothScroll />
        <LangProvider>
          <CartProvider>{children}</CartProvider>
        </LangProvider>
      </body>
    </html>
  );
}
