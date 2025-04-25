"use client";

import { useEffect, useState } from "react";
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
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Link from "next/link";
import Sidebar from "@/app/componants/sidebar/Sidebar";

const OfficeSpaceForm = () => {
  const { addOfficeSpace } = useOfficeSpaces();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openSpaces, setOpenSpaces] = useState(false);
  const [openBookings, setOpenBookings] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);

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
    lat: null as number | null,
    lng: null as number | null,
  });
  const [vendorInfo, setVendorInfo] = useState<any>(null);

  useEffect(() => {
    const storedVendor = localStorage.getItem("vendor");
    if (storedVendor) {
      try {
        setVendorInfo(JSON.parse(storedVendor));
      } catch (error) {
        console.error("Invalid vendor data in localStorage.");
      }
    }
  }, []);

  const vendorId = vendorInfo?._id;


  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const defaultCenter = {
    lat: 18.5204,
    lng: 73.8567,
  };

  const categories = [
    "Office Space",
    "Coworking",
    "Virtual Space",
    "Meeting Room",
    "Private Office",
    "Day Office",
    "Hot Desks",
    "Dedicated Desks",
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
    formDataToSend.append("lat", String(formData.lat ?? ""));
    formDataToSend.append("lng", String(formData.lng ?? ""));

    formDataToSend.append("isNewlyOpen", formData.isNewlyOpen.toString());
    formDataToSend.append("category", formData.category);
    formDataToSend.append("amenities", JSON.stringify(formData.amenities));
    formDataToSend.append("vendorId", vendorId);
    const today = new Date();
    const [startHour, startMinute] = formData.startTime.split(":");
    const [endHour, endMinute] = formData.endTime.split(":");

    // Create date object in local timezone WITHOUT UTC conversion
    const startDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      Number(startHour),
      Number(startMinute),
    );
    const endDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      Number(endHour),
      Number(endMinute),
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
        lat: null as number | null,
        lng: null as number | null,
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
    <div className="flex flex-col md:flex-row min-h-screen mt-42 ">
      {/* Back Button */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        openSpaces={openSpaces}
        setOpenSpaces={setOpenSpaces}
        openBookings={openBookings}
        setOpenBookings={setOpenBookings}
        openReport={openReport} // ✅ Pass this
        setOpenReport={setOpenReport}
        openAccount={openAccount} // ✅ Add this
        setOpenAccount={setOpenAccount} // ✅ Add this
      />

      <main className="flex-1 max-w-4xl mx-auto p-6">
        <div className="mb-4"></div>
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700 py-5">
          ADD OFFICE SPACE
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Label className="text-[#6BB7BE] my-2">Office Space Name</Label>
          <Input
            type="text"
            name="officeSpaceName"
            value={formData.officeSpaceName}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            placeholder="Abc Pvt Ltd"
            required
            className="rounded-none w-full py-5"
          />

          <Label className="text-[#6BB7BE] my-2">Select Category</Label>
          <Select onValueChange={(value) => handleChange("category", value)}>
            <SelectTrigger className="rounded-none w-full py-5">
              <SelectValue placeholder="Office Space" />
            </SelectTrigger>
            <SelectContent className="w-full">
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Label className="text-[#6BB7BE] my-2">City</Label>
          <Input
            type="text"
            name="city"
            value={formData.city}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            placeholder="Pune"
            required
            className="rounded-none w-full py-5"
          />

          <Label className="text-[#6BB7BE] my-2">State</Label>
          <Input
            type="text"
            name="state"
            value={formData.state}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            placeholder="Maharashtra"
            required
            className="rounded-none w-full py-5"
          />

          <Label className="text-[#6BB7BE] my-2">Pincode</Label>
          <Input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            placeholder="411 038"
            required
            className="rounded-none w-full py-5"
          />

          <Label className="text-[#6BB7BE] my-2">Select Location</Label>
          <div>
            <LoadScript
              googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
            >
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={
                  formData.lat && formData.lng
                    ? { lat: formData.lat, lng: formData.lng }
                    : defaultCenter
                }
                zoom={13}
                onClick={(e) => {
                  const lat = e.latLng?.lat();
                  const lng = e.latLng?.lng();
                  if (lat && lng) {
                    handleChange("lat", lat);
                    handleChange("lng", lng);
                  }
                }}
              >
                {formData.lat && formData.lng && (
                  <Marker position={{ lat: formData.lat, lng: formData.lng }} />
                )}
              </GoogleMap>
            </LoadScript>
          </div>

          <Label className="text-[#6BB7BE] my-2">Description (In Short)</Label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            placeholder="Description..."
            required
            className="rounded-none w-full"
          />

          <Label className="text-[#6BB7BE] my-2">
            Extra Description (In Detail)
          </Label>
          <Textarea
            name="extraDescription"
            value={formData.extraDescription}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            placeholder="Extra Description...."
            required
            className="rounded-none w-full"
          />

          <div className="text-gray-600 my-5">
            <Label className="text-[#6BB7BE] my-2">Select Amenities</Label>
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

          <Label className="text-[#6BB7BE] my-2">Price</Label>
          <Input
            type="number"
            name="rate"
            value={formData.rate}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            placeholder="1500"
            required
            className="rounded-none w-full py-5"
          />
          <div className="text-gray-700">
            <Label className="text-[#6BB7BE] my-2">Office Start From </Label>
            <Input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              required
              className="rounded-none w-full py-5"
            />

            <Label className="text-[#6BB7BE] my-2">office Start To</Label>
            <Input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              required
              className="rounded-none w-full py-5"
            />
          </div>

          <Label className="text-[#6BB7BE] my-2">Select Thumbnail Image</Label>
          <Input
            type="file"
            name="thumbnailImage"
            onChange={handleFileChange}
            className="rounded-none w-full text-gray-700 mt-3"
          />

          <Label className="text-[#6BB7BE] my-2">Select 4 Images</Label>
          <Input
            type="file"
            name="multiImages"
            multiple
            onChange={handleMultiFileChange}
            className="rounded-none w-full text-gray-700 mt-3"
          />

          <Label className="text-[#6BB7BE] my-2">Newly Open ?</Label>
          <div className="flex items-center space-x-2 py-2">
            <Checkbox
              id="isNewlyOpen"
              checked={formData.isNewlyOpen}
              onCheckedChange={(checked) =>
                handleChange("isNewlyOpen", checked)
              }
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
      </main>
    </div>
  );
};

export default OfficeSpaceForm;
