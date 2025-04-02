import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./componants/Header";
import Footer from "./componants/Footer";
import { OfficesProvider } from "./context/officesContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "BookMySpace",
  description: "This is hall/meeting room rental management",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
      <OfficesProvider> {/* ✅ Wrap children with OfficesProvider */}
          <Header />
          {children}
          <Footer />
        </OfficesProvider>
      </body>
    </html>
  );
}
