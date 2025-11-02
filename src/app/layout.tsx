import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Alex Ciobotea | Web Developer",
  description: "Building ultra-modern, high-performance websites for ambitious brands.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-to-br from-[#0F0F0F] via-[#111111] to-[#1A1A1A] text-white min-h-screen overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}