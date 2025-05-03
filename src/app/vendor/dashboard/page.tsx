"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Building2, CalendarClock, DollarSign, MailCheck } from "lucide-react";
import {
  LayoutDashboard,
  Plus,
  FolderKanban,
  CalendarDays,
  Settings,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useCounts } from "@/app/context/CountContext";
import Sidebar from "@/app/componants/sidebar/Sidebar";
import { useOfficeSpaces } from "@/app/context/OfficeSpaceContext";
import { useBookSpaces } from "@/app/context/BookSpaceContext";
import { useVendor } from "@/app/context/VendorContext";

const page = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openSpaces, setOpenSpaces] = useState(false);
  const [openBookings, setOpenBookings] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const { officeSpaces } = useOfficeSpaces();
  const { bookings } = useBookSpaces();
  const { vendor } = useVendor();
  const [vendorId, setVendorId] = useState<string | null>(null);
  const { officeSpaceCount, upcomingBookingCount, setOfficeSpaceCount, setUpcomingBookingCount, completedBookingCount, setCompletedBookingCount } = useCounts();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const vendorData = localStorage.getItem("vendor");

      if (vendorData) {
        try {
          const parsedVendor = JSON.parse(vendorData);
          setVendorId(parsedVendor._id);
        } catch (error) {
          console.error("Error parsing vendor data:", error);
        }
      }
    }
  }, []);

  const filteredOfficeSpaces = officeSpaces.filter(
    (space: any) => space.vendorId === vendorId,
  );

  useEffect(() => {
    setOfficeSpaceCount(filteredOfficeSpaces.length);
  }, [filteredOfficeSpaces, setOfficeSpaceCount]);

  const getOfficeDetails = (id: any) => {
    return filteredOfficeSpaces.find((office) => office._id === id);
  };

  const today = new Date().setHours(0, 0, 0, 0);

  const futureBookings = bookings.filter(
    (booking) => new Date(booking.date).getTime() >= today,
  );

  const validFutureBookings = futureBookings.filter((booking) =>
    getOfficeDetails(booking.officeId),
  );

  const pastBookings = bookings.filter(
    (booking) => new Date(booking.date).getTime() < today
  );

  const validPastBookings = pastBookings.filter((booking) =>
    getOfficeDetails(booking.officeId)
  );

  useEffect(() => {
    setUpcomingBookingCount(validFutureBookings.length);
    setCompletedBookingCount(validPastBookings.length);
  }, [validFutureBookings, validPastBookings, setUpcomingBookingCount, setCompletedBookingCount]);


  const revenue = vendor ? vendor.TotalEarning - vendor.TotalEarning * 0.15 : 0;
  const receivedAmount = vendor ? vendor.ReceivedAmount : 0;
  const pendingAmount = revenue - receivedAmount;

  const isActive = (href: string) => pathname === href;
  const navItems = [
    { name: "Dashboard", href: "vendor/dashboard", icon: LayoutDashboard },
    { name: "My Spaces", href: "/dashboard/spaces", icon: Building2 },
    { name: "Bookings", href: "/dashboard/bookings", icon: CalendarDays },
    { name: "Reports", href: "/dashboard/reports", icon: Settings },
  ];
  const cardData = [
    {
      title: "Total Spaces",
      value: officeSpaceCount,
      icon: <Building2 className="w-8 h-8 text-white" />,
      color: "from-[#6bb7be] to-[#58a4ad]",
    },
    {
      title: "Pending Bookings",
      value: upcomingBookingCount,
      icon: <CalendarClock className="w-8 h-8 text-white" />,
      color: "from-[#6bb7be] to-[#4d9ca2]",
    },
    {
      title: "Revenue",
      value: `$${revenue.toFixed(2)}`,
      icon: <DollarSign className="w-8 h-8 text-white" />,
      color: "from-[#6bb7be] to-[#3e8f96]",
    },
    {
      title: "Completed Bookings",
      value: completedBookingCount,
      icon: <MailCheck className="w-8 h-8 text-white" />,
      color: "from-[#6bb7be] to-[#31878f]",
    },
    {
      title: "Received Amount",
      value: `$${receivedAmount.toFixed(2)}`,
      icon: <DollarSign className="w-8 h-8 text-white" />,
      color: "from-[#6bb7be] to-[#3e8f96]",
    },
    {
      title: "Pending Amount",
      value: `$${pendingAmount.toFixed(2)}`,
      icon: <DollarSign className="w-8 h-8 text-white" />,
      color: "from-[#6bb7be] to-[#3e8f96]",
    },
  ];

  return (
    <div className="flex h-screen mt-42">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        openSpaces={openSpaces}
        setOpenSpaces={setOpenSpaces}
        openBookings={openBookings}
        setOpenBookings={setOpenBookings}
        openReport={openReport} // ✅ Pass this
        setOpenReport={setOpenReport}
        openAccount={openAccount} // ✅ Add this
        setOpenAccount={setOpenAccount}
      />

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        {/* Topbar */}
        <div className="flex items-center justify-between md:hidden mb-4">
          <Button
            variant="ghost"
            className="rounded-none"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu />
          </Button>
          <h1 className="text-xl font-semibold">Vendor Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-6">
          {cardData.map((card, idx) => (
            <div
              key={idx}
              className={`rounded-none overflow-hidden bg-gradient-to-br ${card.color} text-white shadow-lg backdrop-blur-sm bg-opacity-60 p-6 transform hover:scale-[1.02] transition-all duration-300`}
            >
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-sm font-medium opacity-80">{card.title}</p>
                  <p className="text-3xl font-extrabold">{card.value}</p>
                </div>
                <div className="p-3 bg-white/20 rounded-full shadow-lg">
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add more components below as needed */}
      </main>
    </div>
  );
};

export default page;
