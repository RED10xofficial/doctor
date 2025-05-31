import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ScrollToTop from "./components/ScrollToTop";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Study.io",
  description: "A platform for students to connect and study together",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <body className={`${poppins.variable} antialiased`}>
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
