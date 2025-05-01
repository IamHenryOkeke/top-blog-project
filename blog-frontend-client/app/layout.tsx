import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

import { League_Spartan } from "next/font/google";
import { Toaster } from "react-hot-toast";

const leagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NmesomaHenry's Blog",
  description: "Welcome to my blog, where I share my thoughts and experiences."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`lg:max-w-7xl mx-auto  antialiased bg-background text-primary ${leagueSpartan.className}`}>
        <Toaster />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
