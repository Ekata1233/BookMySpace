"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
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

const page = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openSpaces, setOpenSpaces] = useState(false);
  const [openBookings, setOpenBookings] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;
  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Spaces", href: "/dashboard/spaces", icon: Building2 },
    { name: "Bookings", href: "/dashboard/bookings", icon: CalendarDays },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];
  const cardData = [
    {
      title: "Total Spaces",
      value: "12",
      icon: <Building2 className="w-8 h-8 text-white" />,
      color: "from-[#6bb7be] to-[#58a4ad]",
    },
    {
      title: "Pending Bookings",
      value: "4",
      icon: <CalendarClock className="w-8 h-8 text-white" />,
      color: "from-[#6bb7be] to-[#4d9ca2]",
    },
    {
      title: "Revenue",
      value: "$2,300",
      icon: <DollarSign className="w-8 h-8 text-white" />,
      color: "from-[#6bb7be] to-[#3e8f96]",
    },
    {
      title: "New Messages",
      value: "7",
      icon: <MailCheck className="w-8 h-8 text-white" />,
      color: "from-[#6bb7be] to-[#31878f]",
    },
  ];

  return (
    <div className="flex h-screen mt-42">
      {/* Sidebar */}
      <aside
        className={`bg-[#6bb7be] text-white w-64 p-4 space-y-4 transition-all duration-300 ease-in-out md:block ${sidebarOpen ? "block" : "hidden"
          } md:relative absolute z-20`}
      >
        <h2 className="text-3xl pt-7 font-extrabold text-white mb-8 tracking-wider">
          Vendor Panel
        </h2>

        <nav className="space-y-4">
          {/* Dashboard */}
          <Link
            href="/dashboard"
            className={`flex items-center gap-4 px-5 py-4 rounded-none text-lg font-bold tracking-wide transition-all duration-300 
          ${isActive("/dashboard")
                ? "bg-gradient-to-r from-[#6bb7be]/30 to-transparent text-white border-l-4 border-[#6bb7be]"
                : "text-white hover:bg-[#6bb7be]/20 hover:border-l-4 hover:border-[#6bb7be] hover:shadow-lg hover:shadow-[#6bb7be]/20"
              }`}
          >
            <LayoutDashboard className="w-6 h-6" />
            Dashboard
          </Link>

          <div>
            <button
              onClick={() => setOpenSpaces(!openSpaces)}
              className="flex items-center w-full gap-4 px-5 py-4 text-lg font-bold text-white hover:bg-[#6bb7be]/20 hover:border-l-4 hover:border-[#6bb7be] transition-all"
            >
              <FolderKanban className="w-6 h-6" />
              Spaces
              <span className="ml-auto">
                {openSpaces ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </span>
            </button>

            {openSpaces && (
              <div className="ml-10 mt-1 space-y-2">
                <Link
                  href="/vendor/addSpace
                  "
                  className={`flex items-center gap-3 px-3 py-2 text-base font-semibold text-white transition-all duration-200  ${isActive("/dashboard/spaces/add") && "text-[#6bb7be]"
                    }`}
                >
                  <Plus className="w-5 h-5" />
                  Add Space
                </Link>

                <Link
                  href="/vendor/mySpaces"
                  className={`flex items-center gap-3 px-3 py-2 text-base font-semibold text-white transition-all duration-200  ${isActive("/dashboard/mySpaces") && "text-[#6bb7be]"
                    }`}
                >
                  <FolderKanban className="w-5 h-5" />
                  My Spaces
                </Link>
              </div>
            )}
          </div>

          {/* Bookings */}
          {/* <Link
            href="/vendor/bookings"
            className={`flex items-center gap-4 px-5 py-4 rounded-none text-lg font-bold tracking-wide transition-all duration-300 
          ${isActive("/dashboard/bookings")
                ? "bg-gradient-to-r from-[#6bb7be]/30 to-transparent text-white border-l-4 border-[#6bb7be]"
                : "text-white hover:bg-[#6bb7be]/20 hover:border-l-4 hover:border-[#6bb7be] hover:shadow-lg hover:shadow-[#6bb7be]/20"
              }`}
          >
            <CalendarDays className="w-6 h-6" />
            Bookings
          </Link> */}

          <div>
            <button
              onClick={() => setOpenBookings(!openBookings)}
              className="flex items-center w-full gap-4 px-5 py-4 text-lg font-bold text-white hover:bg-[#6bb7be]/20 hover:border-l-4 hover:border-[#6bb7be] transition-all"
            >
              <CalendarDays className="w-6 h-6" />
              Bookings
              <span className="ml-auto">
                {openBookings ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </span>
            </button>

            {openBookings && (
              <div className="ml-10 mt-1 space-y-2">
                <Link
                  href="/vendor/bookings/upcomingBookings"
                  className={`flex items-center gap-3 px-3 py-2 text-base font-semibold text-white transition-all duration-200 ${isActive("/dashboard/bookings/upcoming") && "text-[#6bb7be]"
                    }`}
                >
                  <CalendarDays className="w-5 h-5" />
                  Upcoming
                </Link>

                <Link
                  href="/vendor/bookings/completedBookings"
                  className={`flex items-center gap-3 px-3 py-2 text-base font-semibold text-white transition-all duration-200 ${isActive("/dashboard/bookings/completed") && "text-[#6bb7be]"
                    }`}
                >
                  <CalendarDays className="w-5 h-5" />
                  Completed
                </Link>
              </div>
            )}
          </div>


          {/* Settings */}
          <Link
            href="/dashboard/settings"
            className={`flex items-center gap-4 px-5 py-4 rounded-none text-lg font-bold tracking-wide transition-all duration-300 
          ${isActive("/dashboard/settings")
                ? "bg-gradient-to-r from-[#6bb7be]/30 to-transparent text-white border-l-4 border-[#6bb7be]"
                : "text-white hover:bg-[#6bb7be]/20 hover:border-l-4 hover:border-[#6bb7be] hover:shadow-lg hover:shadow-[#6bb7be]/20"
              }`}
          >
            <Settings className="w-6 h-6" />
            Settings
          </Link>
        </nav>
      </aside>

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
