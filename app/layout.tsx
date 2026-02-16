import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Noora — Tu Copiloto de Reuniones con IA",
  description:
    "Noora es tu copiloto inteligente para reuniones. Entiende tus proyectos, recuerda conversaciones pasadas y te entrega insights en tiempo real.",
  keywords: [
    "IA",
    "reuniones",
    "copiloto",
    "inteligencia artificial",
    "productividad",
    "meeting copilot",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
