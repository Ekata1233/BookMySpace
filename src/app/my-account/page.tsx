"use client";

import React, { useState } from "react";
import PersonalInfo from "./personal-info/page";
import MyBooking from "./my-bookings/page";
import UpcomingAppointments from "./upcoming-appointments/page";
import PaymentHistory from "./payment-history/page";

const tabs = [
  { id: "personal", label: "Personal Info" },
  { id: "bookings", label: "My Bookings" },
  { id: "appointments", label: "Upcoming Appointments" },
  { id: "payments", label: "Payment History" },
];

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState("personal");

  const renderContent = () => {
    switch (activeTab) {
      case "personal":
        return <div className="text-sm sm:text-base"> <PersonalInfo />  </div>;
      case "bookings":
        return <div className="text-sm sm:text-base"> <MyBooking/>  </div>;
      case "appointments":
        return <div className="text-sm sm:text-base">  <UpcomingAppointments/> </div>;
      case "payments":
        return <div className="text-sm sm:text-base"> <PaymentHistory/>  </div>;
      default:
        return null;
    }
  };

  return (
    <div className="mt-50 mb-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-screen-xl mx-auto w-full">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700 my-5">
          MY ACCOUNT
        </h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 sm:gap-8 mb-6 border-b border-gray-300">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none border-b-2 rounded-none transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "border-[#6BB7BE] text-[#6BB7BE] font-medium"
                : "border-transparent text-gray-600 hover:text-[#6BB7BE]"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="w-full  rounded-none p-4 sm:p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default MyAccount;
