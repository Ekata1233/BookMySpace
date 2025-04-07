'use client'; // required for Next.js 13+ with useEffect

import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '1500px'
};

const center = {
  lat: 18.5204,  // Latitude for Pune
  lng: 73.8567   // Longitude for Pune
};


const IndiaMap = () => {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={17} // Adjust zoom level for a larger/smaller area
      >
        {/* You can add markers, polygons, etc. here */}
      </GoogleMap>
    </LoadScript>
  );
};

export default IndiaMap;
