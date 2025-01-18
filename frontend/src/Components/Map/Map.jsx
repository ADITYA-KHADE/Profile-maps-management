import React, { useRef, useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Logo from "../../assets/mark.png";
import Drawer from "../Drawer/Drawer";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const calculateCenter = (data) => {
  if (!data || data.length === 0) return { lat: 0, lng: 0 };

  const latSum = data.reduce((sum, item) => sum + item.coordinates[1], 0);
  const lngSum = data.reduce((sum, item) => sum + item.coordinates[0], 0);

  return {
    lat: latSum / data.length,
    lng: lngSum / data.length,
  };
};

const Map = ({ data, selectedMarker, setSelectedMarker }) => {
  const [defaultCenter, setDefaultCenter] = useState({ lat: 0, lng: 0 });
  const [markerCenter, setMarkerCenter] = useState({ lat: 0, lng: 0 });
  const [zoomLevel, setZoomLevel] = useState(3);

  const mapRef = useRef(null);

  const fitBounds = (map, data) => {
    const bounds = new window.google.maps.LatLngBounds();
    data.forEach((item) => {
      const [lng, lat] = item.coordinates;
      bounds.extend(new window.google.maps.LatLng(lat, lng));
    });
    map.fitBounds(bounds);
  };

  const onLoad = (map) => {
    mapRef.current = map;
    if (data && data.length > 0) {
      fitBounds(map, data);
    }
  };

  useEffect(() => {
    const center = calculateCenter(data);
    if (center.lat && center.lng) {
      setMarkerCenter(center);
      setDefaultCenter(center);
    } else {
      console.error("Invalid coordinates", center);
    }
  }, [data]);
  

  useEffect(() => {
    if (selectedMarker) {
      setMarkerCenter(selectedMarker.coordinates);
      setZoomLevel(6);
    } else {
      setMarkerCenter(defaultCenter);
      setZoomLevel(3);
    }
  }, [selectedMarker, defaultCenter]);
  

  return (
    <LoadScript googleMapsApiKey="AIzaSyBGY5aWWIzkTLNQXUD7PkjCV6Ul_ee8E34">
      <GoogleMap
        mapContainerStyle={containerStyle}
        onLoad={onLoad}
        center={markerCenter}
        zoom={zoomLevel}
      >
        {data.map((item, index) => (
          <Marker
            key={index}
            position={{ lat: item.coordinates[1], lng: item.coordinates[0] }}
            onClick={() => {
              setSelectedMarker(item);
              setMarkerCenter(item.coordinates);
              setZoomLevel(6);
            }}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={{
              lat: selectedMarker.coordinates[1],
              lng: selectedMarker.coordinates[0],
            }}
            onCloseClick={() => {
              setSelectedMarker(null);
              setMarkerCenter(defaultCenter);
              setZoomLevel(3);
            }}
          >
            <div className="text-center">
              <div className="flex items-center space-x-4">
                <img
                  src={Logo}
                  alt={selectedMarker.name}
                  className="w-24 h-auto"
                />
                <div>
                  <h3 className="text-lg font-bold">{selectedMarker.name}</h3>
                  <p className="text-sm text-gray-600">
                    {selectedMarker.description}
                  </p>
                  <p className="text-sm text-gray-500 w-40">
                    {selectedMarker.address}
                  </p>
                </div>
              </div>
            </div>
          </InfoWindow>
        )}

        {selectedMarker && (
          <Drawer data={selectedMarker} setSelectedMarker={setSelectedMarker} />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
