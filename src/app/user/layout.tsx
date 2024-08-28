import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SideNavbar from "@/components/shared/user/SideNavbar";
import Navbar from "@/components/shared/user/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema de incidencias - Next.js",
  description: "Proyecto para la materia de Proyecto Integrador 1A - 2024",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={inter.className}>
      <Navbar />
      <SideNavbar />
      {children}
    </div>
  );
}
