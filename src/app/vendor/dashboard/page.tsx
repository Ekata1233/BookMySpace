"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Building2, CalendarClock, DollarSign, MailCheck } from "lucide-react";
import {
    LayoutDashboard,
    
    CalendarDays,
    Settings,
  } from "lucide-react"
  import { usePathname } from "next/navigation"

const page = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname()
  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Spaces", href: "/dashboard/spaces", icon: Building2 },
    { name: "Bookings", href: "/dashboard/bookings", icon: CalendarDays },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ]
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
  ]

  return (
    <div className="flex h-screen mt-42">
      {/* Sidebar */}
      <aside
        className={`bg-[#6bb7be] text-white w-64 p-4 space-y-4 transition-all duration-300 ease-in-out md:block ${
          sidebarOpen ? "block" : "hidden"
        } md:relative absolute z-20`}
      >
        <h2 className="text-2xl font-extrabold text-[#6bb7be] mb-6 tracking-wider">
        Vendor Panel
      </h2>

      <nav className="space-y-3">
        {navItems.map(({ name, href, icon: Icon }, i) => {
          const active = pathname === href
          return (
            <Link
              key={i}
              href={href}
              className={`flex items-center gap-3 px-4 py-2 rounded-none font-semibold text-base tracking-wide transition-all duration-300
                ${
                  active
                    ? "bg-gradient-to-r from-[#6bb7be]/10 to-transparent border-l-4 border-[#6bb7be] text-[#6bb7be]"
                    : "text-gray-700 hover:text-[#6bb7be] hover:translate-x-1 hover:border-l-4 hover:border-[#6bb7be] hover:bg-[#6bb7be]/5"
                }`}
            >
              <Icon className={`w-5 h-5 ${active ? "text-[#6bb7be]" : "text-gray-500"}`} />
              {name}
            </Link>
          )
        })}
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
