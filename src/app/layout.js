"use client";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import { Montserrat } from "next/font/google";
import AuthProvider from "./context/AuthContext";

const roboto = Montserrat({
  subsets: ["latin"],
});
export const metadata = {
  title: "SocialApp",
  description: "Social media app created using NextJS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className}>
      <body className="h-screen w-full">
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
