import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryClientProvider from "@/lib/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bersih.in",
  description:
    "Bersih.in adalah aplikasi cleaning service profesional yang memudahkan Anda memesan layanan kebersihan rumah, kantor, dan bangunan lainnya secara cepat dan terpercaya. Nikmati rumah bersih tanpa repot, cukup lewat aplikasi!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryClientProvider>
            {children}
        </ReactQueryClientProvider>
      
      </body>
    </html>
  );
}
