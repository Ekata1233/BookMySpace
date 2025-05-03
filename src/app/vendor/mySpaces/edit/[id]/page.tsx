"use client";
import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Sidebar from '@/app/componants/sidebar/Sidebar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { useOfficeSpaces } from '@/app/context/OfficeSpaceContext';
import { toast } from 'sonner';

type OfficeSpace = {
    officeSpaceName: string;
    category: string;
    city: string;
    state: string;
    pincode: string;
    lat: number;
    lng: number;
    description: string;
    extraDescription: string;
    amenities: string[];
    rate: number;
    ratePerMonth: number;
    startTime: string;
    endTime: string;
    isNewlyOpen: boolean;
    thumbnailImage: string | undefined; // or File if you're handling images
    multiImages: string[] | File[]; // depending on how you're handling multiple images
};


const EditSpace = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [openSpaces, setOpenSpaces] = useState(false);
    const [openBookings, setOpenBookings] = useState(false);
    const [openReport, setOpenReport] = useState(false);
    const [openAccount, setOpenAccount] = useState(false);
    const [officeSpace, setOfficeSpace] = useState<OfficeSpace | null>(null);
    const { id } = useParams<{ id: string }>();;
    const { updateOfficeSpace } = useOfficeSpaces();


    console.log("office space in id : ", id)


    useEffect(() => {
        if (id) {
            // Fetch data from the API endpoint using the ID
            const fetchData = async () => {
                try {
                    const response = await fetch(`/api/officeSpaces/${id}`)
                    console.log("response : ", response)
                    const data = await response.json()

                    if (data.success) {
                        setOfficeSpace(data.data)
                    } else {
                        console.log("error")
                    }
                } catch (error) {
                    console.log("error")
                } finally {
                    console.log("error")
                }
            }

            fetchData()
        }
    }, [id])

    const defaultCenter = { lat: 18.5204, lng: 73.8567 };
    const mapContainerStyle = { height: '300px', width: '100%' };

    const categories = ["Office Space",
        "Coworking",
        "Virtual Space",
        "Meeting Room",
        "Private Office",
        "Day Office",
        "Hot Desks",
        "Dedicated Desks",];
    const amenitiesList = ["Work Desk",
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
        "Pantry",];

    type FormDataType = {
        officeSpaceName: string;
        category: string;
        city: string;
        state: string;
        pincode: string;
        lat: number | null;
        lng: number | null;
        description: string;
        extraDescription: string;
        amenities: string[]; // <-- explicitly set as string[]
        rate: string;
        ratePerMonth: string;
        startTime: string;
        endTime: string;
        isNewlyOpen: boolean;
        thumbnailImage: File | null;
        multiImages: File[];
    };

    const [formData, setFormData] = useState<FormDataType>({
        officeSpaceName: '',
        category: '',
        city: '',
        state: '',
        pincode: '',
        lat: null,
        lng: null,
        description: '',
        extraDescription: '',
        amenities: [], // TypeScript now knows it's string[]
        rate: '',
        ratePerMonth: '',
        startTime: '',
        endTime: '',
        isNewlyOpen: false,
        thumbnailImage: null,
        multiImages: [],
    });


    useEffect(() => {
        if (officeSpace) {
            const formatTime = (time: any) => {
                const date = new Date(time);
                const hours = date.getHours().toString().padStart(2, '0'); // Ensure two digits
                const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure two digits
                return `${hours}:${minutes}`;
            };
            setFormData({
                officeSpaceName: officeSpace.officeSpaceName || '',
                category: officeSpace.category || '',
                city: officeSpace.city || '',
                state: officeSpace.state || '',
                pincode: officeSpace.pincode || '',
                lat: officeSpace.lat || null,
                lng: officeSpace.lng || null,
                description: officeSpace.description || '',
                extraDescription: officeSpace.extraDescription || '',
                amenities: officeSpace.amenities || [],
                rate: officeSpace.rate !== undefined && officeSpace.rate !== null ? officeSpace.rate.toString() : '',
                ratePerMonth: officeSpace.ratePerMonth !== undefined && officeSpace.ratePerMonth !== null ? officeSpace.ratePerMonth.toString() : '',
                startTime: officeSpace.startTime ? formatTime(officeSpace.startTime) : '00:00', // Format startTime
                endTime: officeSpace.endTime ? formatTime(officeSpace.endTime) : '00:00',
                isNewlyOpen: officeSpace.isNewlyOpen || false,
                thumbnailImage: null, // Reset as it might change
                multiImages: [], // Reset as it might change
            });
        }
    }, [officeSpace]);

    const handleChange = (name: any, value: any) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAmenityChange = (amenity: any) => {
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

        if (!id) {
            console.log("Office space ID is missing");
            return;
        }

        const today = new Date();
        const [startHour, startMinute] = formData.startTime.split(":");
        const [endHour, endMinute] = formData.endTime.split(":");

        const startDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            +startHour,
            +startMinute
        );
        const endDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            +endHour,
            +endMinute
        );

        const formatLocalDateTime = (date: Date) =>
            date.toLocaleString("sv-SE").replace(" ", "T");

        // Build JSON object to send
        const updateData: Partial<OfficeSpace> = {
            officeSpaceName: formData.officeSpaceName,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            description: formData.description,
            extraDescription: formData.extraDescription,
            rate: Number(formData.rate),
            ratePerMonth: Number(formData.ratePerMonth),
            lat: formData.lat ? parseFloat(String(formData.lat)) : undefined,
            lng: formData.lng ? parseFloat(String(formData.lng)) : undefined,
            isNewlyOpen: formData.isNewlyOpen,
            category: formData.category,
            amenities: formData.amenities,
            startTime: formatLocalDateTime(startDate),
            endTime: formatLocalDateTime(endDate),
        };

        try {
            await updateOfficeSpace(id, updateData);
            toast.success("Office space updated successfully!");
            setFormData({
                officeSpaceName: "",
                city: "",
                state: "",
                pincode: "",
                description: "",
                extraDescription: "",
                rate: "",
                ratePerMonth: "",
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
            console.error("Failed to update office space:", error);
            toast.error("Failed to update office space");
        }
    };


    return (
        <div className="flex flex-col md:flex-row min-h-screen mt-42">
            <Sidebar
                sidebarOpen={sidebarOpen}
                openSpaces={openSpaces}
                setOpenSpaces={setOpenSpaces}
                openBookings={openBookings}
                setOpenBookings={setOpenBookings}
                openReport={openReport}
                setOpenReport={setOpenReport}
                openAccount={openAccount}
                setOpenAccount={setOpenAccount}
            />

            <main className="flex-1 max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-bold text-gray-700 py-5">Edit Office Space</h1>
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
                    <Select
                        onValueChange={(value) => handleChange('category', value)}
                        value={formData.category}
                    >
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
                        placeholder="411038"
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

                    <Label className="text-[#6BB7BE] my-2">Description</Label>
                    <Textarea
                        name="description"
                        value={formData.description}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        required
                        className="rounded-none w-full"
                    />

                    <Label className="text-[#6BB7BE] my-2">Extra Description</Label>
                    <Textarea
                        name="extraDescription"
                        value={formData.extraDescription}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        required
                        className="rounded-none w-full"
                    />

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

                    <Label className="text-[#6BB7BE] my-2">Rate per Hour</Label>
                    <Input
                        type="number"
                        name="rate"
                        value={formData.rate}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        placeholder="1500"
                        required
                        className="rounded-none w-full py-5"
                    />

                    <Label className="text-[#6BB7BE] my-2">Rate per Month</Label>
                    <Input
                        type="number"
                        name="ratePerMonth"
                        value={formData.ratePerMonth}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        placeholder="25000"
                        required
                        className="rounded-none w-full py-5"
                    />

                    <Label className="text-[#6BB7BE] my-2">Office Start From</Label>
                    <Input
                        type="time"
                        name="startTime"
                        value={formData.startTime}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        required
                        className="rounded-none w-full py-5"
                    />

                    <Label className="text-[#6BB7BE] my-2">Office Start To</Label>
                    <Input
                        type="time"
                        name="endTime"
                        value={formData.endTime}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        required
                        className="rounded-none w-full py-5"
                    />

                    <Label className="text-[#6BB7BE] my-2">Thumbnail Image</Label>
                    <Input
                        type="file"
                        name="thumbnailImage"
                        onChange={handleFileChange}
                        className="rounded-none w-full text-gray-700 mt-3"
                    />

                    <Label className="text-[#6BB7BE] my-2">Upload 4 Images</Label>
                    <Input
                        type="file"
                        name="multiImages"
                        multiple
                        onChange={handleMultiFileChange}
                        className="rounded-none w-full text-gray-700 mt-3"
                    />

                    <Label className="text-[#6BB7BE] my-2">Newly Open?</Label>
                    <div className="flex items-center space-x-2 py-2">
                        <Checkbox
                            id="isNewlyOpen"
                            checked={formData.isNewlyOpen}
                            onCheckedChange={(checked) => handleChange('isNewlyOpen', checked)}
                        />
                        <Label htmlFor="isNewlyOpen" className="text-gray-700">
                            Newly Open
                        </Label>
                    </div>

                    <Button
                        type="submit"
                        className="h-10 w-full sm:w-auto flex rounded-none items-center justify-center text-white hover:text-[#6BB7BE] border border-[#6BB7BE] px-10 font-bold bg-[#6BB7BE] hover:bg-[#FAFAFA] font-medium"
                    >
                        Update
                    </Button>
                </form>
            </main>
        </div>
    );
};

export default EditSpace;
