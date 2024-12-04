"use client";
import Navbar from "@/components/Navbar";
import "../app/globals.css";
import Footer from "@/components/Footer";
import { Montserrat } from "next/font/google";
import AuthProvider from "./context/AuthContext";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import ourFileRouter from "./api/uploadthing/core";
const roboto = Montserrat({
  subsets: ["latin"],
  preload: false,
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Connect</title>
        <meta name="Connect" content="Social media app created using NextJS." />
      </head>
      <body className={roboto.className}>
        <div className="h-screen w-full">
          <AuthProvider>
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            <Navbar />
            {children}
            <Footer />
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
