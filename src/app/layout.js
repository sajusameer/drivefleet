import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import MainNavbar from "@/components/Navbar";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning  data-scroll-behavior="smooth">
      <body
        suppressHydrationWarning
        className={`${outfit.variable} ${inter.variable}`}
      >
        <Providers>
          <MainNavbar />
          {children}
          <Footer/>
          <Toaster/>
        </Providers>
      </body>
    </html>
  );
}