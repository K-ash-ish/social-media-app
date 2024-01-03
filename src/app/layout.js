"use client";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import { Montserrat } from "next/font/google";
import AuthProvider from "./context/AuthContext";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import ourFileRouter from "./api/uploadthing/core";
const roboto = Montserrat({
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className}>
      <head>
        <title>SocialApp</title>
        <meta
          name="description"
          content="Social media app created using NextJS."
        />
      </head>
      <body className="h-screen w-full">
        <AuthProvider>
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
