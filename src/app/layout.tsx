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
import { VendorProvider } from "./context/VendorContext";
import { CountProvider } from "./context/CountContext";
import { UserProvider } from "./context/UserContext";
import { BookingProvider } from "./context/BookingContext";
import { VendorBankDetailsProvider} from "./context/BankDetailsContext";
import VendorBankDetails from "@/models/VendorBankDetails";

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
                  <WorkBusinessProvider>
                    <ExploreOfficeProvider>
                      <VendorProvider>
                        <CountProvider>
                          <VendorBankDetailsProvider> <UserProvider><Header />
                            {children}
                            <Footer /></UserProvider></VendorBankDetailsProvider></CountProvider>

                      </VendorProvider>
                    </ExploreOfficeProvider>
                  </WorkBusinessProvider>
                </OfficeTourProvider>
              </OfficeSpaceProvider>
            </ContactProvider>
          </BookSpaceProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
