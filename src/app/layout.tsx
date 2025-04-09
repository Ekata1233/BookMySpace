import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./componants/Header";
import Footer from "./componants/Footer";
import { OfficeSpaceProvider } from "./context/OfficeSpaceContext";
import { AuthProvider } from "./context/authContext";
import { ContactProvider } from "./context/ContactContex";
import { BookSpaceProvider } from "./context/BookSpaceContext";
import { OfficeTourProvider } from "./context/OfficeTourContext";
import { ExploreOfficeProvider } from "./context/ExploreOfficeContext";
import { WorkBusinessProvider } from "./context/WorkBusinessContext";

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
          <BookSpaceProvider>
            <ContactProvider>
              <OfficeSpaceProvider>
                <OfficeTourProvider>
                  <ExploreOfficeProvider>
                    <WorkBusinessProvider>
                      <Header />
                      {children}
                      <Footer />
                    </WorkBusinessProvider>
                  </ExploreOfficeProvider>
                </OfficeTourProvider>
              </OfficeSpaceProvider>
            </ContactProvider>
          </BookSpaceProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
