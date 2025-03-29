"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const Contact = () => {
  const [activeTab, setActiveTab] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    requirement: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: any) => {
    setFormData({ ...formData, requirement: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  const handleSearch = () => {
    console.log("Form search:");
  };
  return (
    <div className="mt-54 mx-2 sm:mx-8 md:mx-8 lg:mx-10 xl:mx-30 2xl:mx-44">
      <div className="text-center my-5">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700 py-2">
          CONTACT
        </h1>
        <h5 className="text-lg sm:text-lg md:text-xl lg:text-xl font-bold my-3 text-gray-700">
          Hello, please enter your contact details to get started.
        </h5>
        <p className=" text-sm sm:text-base md:text-lg  leading-relaxed">
          We will solely use this information to contact you about products and
          services.
        </p>

        <div className="text-gray-700 m-5 w-5/6 mx-auto border shadow-lg mb-20">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 p-8"
          >
            {/* Left Column */}
            <div className="flex flex-col space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="py-5 mt-2 rounded-none"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="py-5 mt-2 rounded-none"
                />
              </div>
              <div>
                <Label htmlFor="company">Company Name</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="py-5 mt-2 rounded-none"
                />
              </div>
            </div>
            {/* Right Column */}
            <div className="flex flex-col space-y-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="py-5 mt-2 rounded-none"
                />
              </div>
              <div>
                <Label className="mb-2">Your Requirement</Label>
                <select
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value)}
                  className="w-full p-2 pr-8 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#6BB7BE] appearance-none bg-white "
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="officeSpace">Office Space </option>
                  <option value="coworking">Coworking</option>
                  <option value="meetingRoom">Meeting Room</option>
                  <option value="privateOffice">Private Office</option>
                </select>
              </div>
            </div>
            {/* Submit Button */}
            <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
              <Button
                onClick={handleSearch}
                className="h-12 w-full sm:w-auto flex rounded-none items-center justify-center text-white hover:text-[#6BB7BE] border border-[#6BB7BE] px-10 font-bold bg-[#6BB7BE] hover:bg-[#FAFAFA] font-medium"
              >
                SUBMIT
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
