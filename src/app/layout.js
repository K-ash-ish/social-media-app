import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata = {
  title: "SocialApp",
  description: "Social media app created using NextJS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
