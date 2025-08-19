import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
// import { CartProvider } from "@/lib/context/CartContext";
import { CatalogProduct } from "@/lib/types/catalog";
import Catalog from "@/components/Catalog";
import { CatalogProvider } from "@/lib/context/ProductContext";
import { CartProvider } from "@/lib/context/CartContext";
import Navbar from "@/components/main/Navbar";
import MinimizedNavbar from "@/components/MinimizedNavbar";

// Configure the fonts
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-serif",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Zaavg Collection",
  description: "Handcrafted luxury jewelry",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
      <CartProvider>

      <body>
        <Navbar />

        {children}</body>

      </CartProvider>
    </html>
  );
}