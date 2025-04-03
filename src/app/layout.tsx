import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./componants/Header";
import Footer from "./componants/Footer";
import { OfficeSpaceProvider } from "./context/OfficeSpaceContext";
<<<<<<< HEAD
import { AuthProvider } from "./context/authContext";
import { ContactProvider } from "./context/ContactContex";
=======
import { ContactProvider } from "./context/ContactContex";
>>>>>>> 2b223b29ba3624ccb3ece67f8887d53dac42ab0d

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
        <AuthProvider>
        <OfficeSpaceProvider>
        <Header />
        {children}
        <Footer />
        </OfficeSpaceProvider>
        </AuthProvider>
        <ContactProvider>
          <OfficeSpaceProvider>
            <Header />
            {children}
            <Footer />
          </OfficeSpaceProvider>
        </ContactProvider>
      </body>
    </html>
  );
}
