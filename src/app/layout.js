import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import { Montserrat } from "next/font/google";

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
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
