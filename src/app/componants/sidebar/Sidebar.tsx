"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  FolderKanban,
  ChevronDown,
  ChevronUp,
  Plus,
  CalendarDays,
  Settings,
  Landmark,
  Banknote,
  FileText,
  BookCopy,
  Clock,
  CheckCircle,
} from "lucide-react";
import { usePathname } from "next/navigation";

interface SidebarProps {
  sidebarOpen: boolean;
  openSpaces: boolean;
  setOpenSpaces: (value: boolean) => void;
  openBookings: boolean;
  setOpenBookings: (value: boolean) => void;
  openReport: boolean; // ✅ Add this
  setOpenReport: (value: boolean) => void; // ✅ And this
  openAccount: boolean;
  setOpenAccount: (value: boolean) => void;
}

const Sidebar = ({
  sidebarOpen,
  openSpaces,
  setOpenSpaces,
  openBookings,
  setOpenBookings,
  openReport,
  setOpenReport,
  openAccount,
  setOpenAccount,
}: SidebarProps) => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <aside
      className={`bg-[#6bb7be] text-white w-64 p-4 space-y-4 transition-all duration-300 ease-in-out md:block ${
        sidebarOpen ? "block" : "hidden"
      } md:relative absolute z-20`}
    >
      <h2 className="text-3xl pt-7 font-extrabold text-white mb-8 tracking-wider">
        Vendor Panel
      </h2>

      <nav className="space-y-4">
        {/* Dashboard */}
        <Link
          href="/vendor/dashboard"
          className={`flex items-center gap-4 px-5 py-4 rounded-none text-lg font-bold tracking-wide transition-all duration-300 
            ${
              isActive("/vendor/dashboard")
                ? "bg-gradient-to-r from-[#6bb7be]/30 to-transparent text-white border-l-4 border-[#6bb7be]"
                : "text-white hover:bg-[#6bb7be]/20 hover:border-l-4 hover:border-[#6bb7be] hover:shadow-lg hover:shadow-[#6bb7be]/20"
            }`}
        >
          <LayoutDashboard className="w-6 h-6" />
          Dashboard
        </Link>

        {/* Spaces Dropdown */}
        <div>
          <button
            onClick={() => setOpenSpaces(!openSpaces)}
            className="flex items-center w-full gap-4 px-5 py-4 text-lg font-bold text-white hover:bg-[#6bb7be]/20 hover:border-l-4 hover:border-[#6bb7be] transition-all"
          >
            <FolderKanban className="w-6 h-6" />
            Spaces
            <span className="ml-auto">
              {openSpaces ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </span>
          </button>

          {openSpaces && (
            <div className="ml-10 mt-1 space-y-2">
              <Link
                href="/vendor/addSpace"
                className={`flex items-center gap-3 px-3 py-2 text-base font-semibold text-white transition-all duration-200 ${
                  isActive("/dashboard/spaces/add") && "text-[#6bb7be]"
                }`}
              >
                <Plus className="w-5 h-5" />
                Add Space
              </Link>

              <Link
                href="/vendor/mySpaces"
                className={`flex items-center gap-3 px-3 py-2 text-base font-semibold text-white transition-all duration-200 ${
                  isActive("/dashboard/mySpaces") && "text-[#6bb7be]"
                }`}
              >
                <FolderKanban className="w-5 h-5" />
                My Spaces
              </Link>
            </div>
          )}
        </div>

        {/* Bookings Dropdown */}
        <div>
          <button
            onClick={() => setOpenBookings(!openBookings)}
            className="flex items-center w-full gap-4 px-5 py-4 text-lg font-bold text-white hover:bg-[#6bb7be]/20 hover:border-l-4 hover:border-[#6bb7be] transition-all"
          >
            <CalendarDays className="w-6 h-6" />
            Bookings
            <span className="ml-auto">
              {openBookings ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </span>
          </button>

          {openBookings && (
            <div className="ml-10 mt-1 space-y-2">
              <Link
                href="/vendor/bookings/upcomingBookings"
                className={`flex items-center gap-3 px-3 py-2 text-base font-semibold text-white transition-all duration-200 ${
                  isActive("/dashboard/bookings/upcoming") && "text-[#6bb7be]"
                }`}
              >
                <Clock  className="w-5 h-5" />
                Upcoming
              </Link>

              <Link
                href="/vendor/bookings/completedBookings"
                className={`flex items-center gap-3 px-3 py-2 text-base font-semibold text-white transition-all duration-200 ${
                  isActive("/dashboard/bookings/completed") && "text-[#6bb7be]"
                }`}
              >
                <CheckCircle className="w-5 h-5" />
                Completed
              </Link>
            </div>
          )}
        </div>

        {/* Account Dropdown */}
        <div>
          <button
            onClick={() => setOpenAccount(!openAccount)}
            className="flex items-center w-full gap-4 px-5 py-4 text-lg font-bold text-white hover:bg-[#6bb7be]/20 hover:border-l-4 hover:border-[#6bb7be] transition-all"
          >
            <Settings className="w-6 h-6" />
            Account
            <span className="ml-auto">
              {openAccount ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
              {openAccount ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </span>
          </button>

          {openAccount && (
            <div className="ml-10 mt-1 space-y-2">
              <Link
                href="/vendor/accountManagement/accountInfo"
                className={`flex items-center gap-3 px-3 py-2 text-base font-semibold text-white transition-all duration-200 ${
                  isActive("/dashboard/accountManagement/accountInfo") &&
                  "text-[#6bb7be]"
                }`}
              >
                <Landmark className="w-5 h-5" />
                Account Information
              </Link>

              <Link
                href="/vendor/accountManagement/bankInfo"
                className={`flex items-center gap-3 px-3 py-2 text-base font-semibold text-white transition-all duration-200 ${
                  isActive("/dashboard/accountManagement/bankInfo") &&
                  "text-[#6bb7be]"
                }`}
              >
                <Banknote className="w-5 h-5" />
                Bank Information
              </Link>
            </div>
          )}
        </div>

        {/* Reports Dropdown */}
        <div>
          <button
            onClick={() => setOpenReport(!openReport)}
            className="flex items-center w-full gap-4 px-5 py-4 text-lg font-bold text-white hover:bg-[#6bb7be]/20 hover:border-l-4 hover:border-[#6bb7be] transition-all"
          >
            <FileText className="w-6 h-6" />
            Reports
            <span className="ml-auto">
              {openReport ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </span>
          </button>

          {openReport && (
            <div className="ml-10 mt-1 space-y-2">
              <Link
                href="/vendor/report/transitionreport"
                className={`flex items-center gap-3 px-3 py-2 text-base font-semibold text-white transition-all duration-200 ${
                  isActive("/dashboard/report/transition") && "text-[#6bb7be]"
                }`}
              >
                <FileText className="w-5 h-5" />
                Transition Report
              </Link>

              <Link
                href="/vendor/report/bookingreport"
                className={`flex items-center gap-3 px-3 py-2 text-base font-semibold text-white transition-all duration-200 ${
                  isActive("/dashboard/report/booking") && "text-[#6bb7be]"
                }`}
              >
                <BookCopy className="w-5 h-5" />
                Booking Report
              </Link>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
