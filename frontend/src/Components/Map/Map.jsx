import React, { useRef, useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Logo from "../../assets/mark.png";
import Drawer from "../Drawer/Drawer";

const api=import.meta.env.VITE_MAP_API_KEY;


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

const validateCoordinates = (item) => {
  return (
    item.coordinates &&
    Array.isArray(item.coordinates) &&
    item.coordinates.length === 2 &&
    !isNaN(item.coordinates[0]) &&
    !isNaN(item.coordinates[1])
  );
};

const Map = ({ data, selectedMarker, setSelectedMarker }) => {
  const [defaultCenter, setDefaultCenter] = useState({ lat: 0, lng: 0 });
  const [markerCenter, setMarkerCenter] = useState({ lat: 0, lng: 0 });
  const [zoomLevel, setZoomLevel] = useState(2);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: api,
  });

  const mapRef = useRef(null);

  const fitBounds = (map, data) => {
    if (data.length === 0) return;

    const bounds = new window.google.maps.LatLngBounds();
    data.forEach((item) => {
      if (validateCoordinates(item)) {
        const [lng, lat] = item.coordinates;
        bounds.extend(new window.google.maps.LatLng(lat, lng));
      }
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
    const center = calculateCenter(data.filter(validateCoordinates));
    if (center.lat && center.lng) {
      setMarkerCenter(center);
      setDefaultCenter(center);
    } else {
      console.error("Invalid coordinates", center);
    }

    if (mapRef.current && data.length > 0) {
      fitBounds(mapRef.current, data);
    }
  }, [data]);

  useEffect(() => {
    if (selectedMarker) {
      setMarkerCenter(selectedMarker.coordinates);
      setZoomLevel(6);
    } else {
      setMarkerCenter(defaultCenter);
      setZoomLevel(2);
    }
  }, [selectedMarker, defaultCenter]);

  if (loadError) return <div>Error loading Google Maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  if (!data || data.length === 0) {
    return <div>No data available to display on the map.</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      onLoad={onLoad}
      center={markerCenter}
      zoom={zoomLevel}
    >
      {data.filter(validateCoordinates).map((item, index) => (
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
            setZoomLevel(2);
          }}
        >
          <div className="text-center">
            <div className="flex items-center space-x-4">
              <img
                src={selectedMarker.photo ? selectedMarker.photo : Logo}
                alt={selectedMarker.name}
                className="w-20 h-auto"
              />
              <div>
                <h3 className="text-lg font-bold">{selectedMarker.name}</h3>
                <p className="text-xs mb-2 text-gray-600">
                  {selectedMarker.description}
                </p>
                <p className="text-xs text-gray-500 w-32">
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
  );
};

export default Map;
