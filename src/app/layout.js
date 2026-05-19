import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import MainNavbar from "@/components/Navbar";
import { Providers } from "./providers";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        className={`${outfit.variable} ${inter.variable}`}
      >
        <Providers>
          <MainNavbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}