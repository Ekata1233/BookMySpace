"use client";

import React, { useState, useEffect, useRef } from "react";
import { useOfficeSpaces } from "@/app/context/OfficeSpaceContext";
import {
  GoogleMap,
  LoadScript,
  Marker,
  OverlayView,
} from "@react-google-maps/api";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 18.5204, // Pune as initial center
  lng: 73.8567,
};

const MapComponent: React.FC = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const { officeSpaces } = useOfficeSpaces();
  const [hoveredOffice, setHoveredOffice] = useState<any>(null);
  const [clickedOffice, setClickedOffice] = useState<any>(null);

  const activeOffice = clickedOffice || hoveredOffice;
  const overlayRef = useRef<HTMLDivElement | null>(null);

  // Close card when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(event.target as Node)
      ) {
        setClickedOffice(null);
      }
    };

    if (clickedOffice) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [clickedOffice]);

  if (!apiKey) {
    throw new Error(
      "Google Maps API key is not defined in environment variables.",
    );
  }

  return (
    <div className="relative w-full h-40">
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={6}>
          {officeSpaces?.map(
            (office) =>
              office.lat &&
              office.lng &&
              office.isAdminApprove === true && (
                <Marker
                  key={office._id}
                  position={{ lat: office.lat, lng: office.lng }}
                  title={office.officeSpaceName}
                  onMouseOver={() => setHoveredOffice(office)}
                  onMouseOut={() => {
                    setTimeout(() => {
                      setHoveredOffice(null);
                    }, 300);
                  }}
                  onClick={() => {
                    setClickedOffice(office);
                  }}
                />
              ),
          )}

          {activeOffice && activeOffice.lat && activeOffice.lng && (
            <OverlayView
              position={{ lat: activeOffice.lat, lng: activeOffice.lng }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div className="w-[300px]" ref={overlayRef}>
                <Card className="shadow-lg border border-[#6bb7be] rounded-none overflow-hidden">
                  <div className="w-full h-[200px]">
                    <img
                      src={activeOffice.thumbnailImage}
                      alt={activeOffice.officeSpaceName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="px-4 rounded-none">
                    <CardTitle className="text-lg font-semibold text-[#6bb7be]">
                      {activeOffice.officeSpaceName}
                    </CardTitle>
                    <CardDescription className="mt-2 text-gray-700">
                      {activeOffice.city}, {activeOffice.state}
                    </CardDescription>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {activeOffice.category}
                    </p>
                    <p className="mt-1 mb-2 text-sm text-muted-foreground">
                      Rate :{" "}
                      <span className="text-[#6bb7be] font-semibold">
                        {activeOffice.rate} / Hour
                      </span>
                    </p>
                    <Link
                      href={`/${(Array.isArray(activeOffice.category)
                        ? activeOffice.category[0]
                        : activeOffice.category
                      )
                        ?.toLowerCase()
                        .replace(/\s+/g, "-")}/${activeOffice._id}`}
                      className="text-sm sm:text-base text-white hover:text-[#6BB7BE] border border-[#6BB7BE] bg-[#6BB7BE] hover:bg-[#FAFAFA] font-medium rounded-none py-2 px-4 w-full"
                    >
                      View More
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </OverlayView>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapComponent;
