"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useOfficeSpaces } from "@/app/context/OfficeSpaceContext";

const OfficeSpaceForm = () => {
  const { addOfficeSpace } = useOfficeSpaces();
  const [formData, setFormData] = useState({
    officeSpaceName: "",
    city: "",
    state: "",
    pincode: "",
    description: "",
    extraDescription: "",
    rate: "",
    startTime: "",
    endTime: "",
    amenities: [] as string[],
    isNewlyOpen: false,
    category: "",
    thumbnailImage: null as File | null,
    multiImages: [] as File[],
  });

  console.log("form data : ", formData);

  const categories = [
    "Office Space",
    "Virtual Office",
    "Meeting Room",
    "Private Office",
  ];
  const amenitiesList = [
    "Work Desk",
    "Private Cabins",
    "24x7 Availability",
    "High Speed Internet",
    "Conference Rooms",
    "Discussion Rooms",
    "Office Assistance",
    "Meeting Rooms",
    "Power Backup",
    "Security",
    "HouseKeeping",
    "Pantry",
  ];
  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmenityChange = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, thumbnailImage: file }));
  };

  const handleMultiFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData((prev) => ({ ...prev, multiImages: files }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("officeSpaceName", formData.officeSpaceName);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("state", formData.state);
    formDataToSend.append("pincode", formData.pincode);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("extraDescription", formData.extraDescription);
    formDataToSend.append("rate", formData.rate.toString());
    formDataToSend.append("isNewlyOpen", formData.isNewlyOpen.toString());
    formDataToSend.append("category", formData.category);
    formDataToSend.append("amenities", JSON.stringify(formData.amenities));
    const today = new Date();
    const [startHour, startMinute] = formData.startTime.split(":");
    const [endHour, endMinute] = formData.endTime.split(":");

    // Create date object in local timezone WITHOUT UTC conversion
    const startDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      Number(startHour),
      Number(startMinute)
    );
    const endDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      Number(endHour),
      Number(endMinute)
    );

    // Format date as "YYYY-MM-DDTHH:mm:ss" to keep local time
    const formatLocalDateTime = (date: Date) => {
      return date.toLocaleString("sv-SE").replace(" ", "T");
    };

    formDataToSend.append("startTime", formatLocalDateTime(startDate));
    formDataToSend.append("endTime", formatLocalDateTime(endDate));

    if (formData.thumbnailImage) {
      formDataToSend.append("thumbnailImage", formData.thumbnailImage);
    }

    formData.multiImages.forEach((file) => {
      formDataToSend.append("multiImages", file);
    });

    console.log("form data to send : ", formDataToSend);

    try {
      await addOfficeSpace(formDataToSend); // Make sure your function handles FormData
      alert("Office space added successfully!");
      setFormData({
        officeSpaceName: "",
        city: "",
        state: "",
        pincode: "",
        description: "",
        extraDescription: "",
        rate: "",
        startTime: "",
        endTime: "",
        amenities: [] as string[],
        isNewlyOpen: false,
        category: "",
        thumbnailImage: null as File | null,
        multiImages: [],
      });
    } catch (error) {
      console.error("Error submitting office space:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-40">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700 py-5">
        ADD OFFICE SPACE
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          name="officeSpaceName"
          value={formData.officeSpaceName}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          placeholder="Office Space Name"
          required
          className="rounded-none w-full py-5"
        />
        <Select onValueChange={(value) => handleChange("category", value)}>
          <SelectTrigger className="rounded-none w-full py-5">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent className="w-full">
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="text"
          name="city"
          value={formData.city}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          placeholder="City"
          required
          className="rounded-none w-full py-5"
        />
        <Input
          type="text"
          name="state"
          value={formData.state}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          placeholder="State"
          required
          className="rounded-none w-full py-5"
        />
        <Input
          type="text"
          name="pincode"
          value={formData.pincode}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          placeholder="Pincode"
          required
          className="rounded-none w-full py-5"
        />
        <Textarea
          name="description"
          value={formData.description}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          placeholder="Description"
          required
          className="rounded-none w-full"
        />

        <Textarea
          name="extraDescription"
          value={formData.extraDescription}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          placeholder="extraDescription"
          required
          className="rounded-none w-full"
        />

        <div className="text-gray-700 my-5">
          <Label className="block mb-2">Select Amenities</Label>
          <div className="grid grid-cols-2 gap-2">
            {amenitiesList.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity}
                  checked={formData.amenities.includes(amenity)}
                  onCheckedChange={() => handleAmenityChange(amenity)}
                />
                <Label htmlFor={amenity}>{amenity}</Label>
              </div>
            ))}
          </div>
        </div>
        <Input
          type="number"
          name="rate"
          value={formData.rate}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          placeholder="Rate"
          required
          className="rounded-none w-full py-5"
        />
        <div className="text-gray-700">
          <Label className="py-2">Office Start From</Label>
          <Input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            required
            className="rounded-none w-full py-5"
          />

          <Label className="py-2 mt-3">Office Start To</Label>
          <Input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            required
            className="rounded-none w-full py-5"
          />
        </div>
        <Input
          type="file"
          name="thumbnailImage"
          onChange={handleFileChange}
          className="rounded-none w-full text-gray-700 mt-3"
        />
        <Input
          type="file"
          name="multiImages"
          multiple
          onChange={handleMultiFileChange}
          className="rounded-none w-full text-gray-700 mt-3"
        />
        <div className="flex items-center space-x-2 py-2">
          <Checkbox
            id="isNewlyOpen"
            checked={formData.isNewlyOpen}
            onCheckedChange={(checked) => handleChange("isNewlyOpen", checked)}
          />
          <Label htmlFor="isNewlyOpen " className="text-gray-700">
            Newly Open
          </Label>
        </div>
        <Button
          type="submit"
          className="h-10 w-full sm:w-auto flex rounded-none items-center justify-center text-white hover:text-[#6BB7BE] border border-[#6BB7BE] px-10 font-bold bg-[#6BB7BE] hover:bg-[#FAFAFA] font-medium"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default OfficeSpaceForm;
