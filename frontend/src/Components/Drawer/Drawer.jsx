import React from "react";
import Logo from "../../assets/mark.png";

const Drawer = ({ data, setSelectedMarker }) => {
  return (
    <div
      className="fixed top-0 right-0 w-96 h-full bg-white shadow-lg transform transition-transform translate-x-0"
      style={{ zIndex: 999 }}
    >
      <div className="flex justify-between p-4 border-b">
        <img src={Logo} alt="Logo" className="w-8 h-8" onClick={() => setSelectedMarker(null)} />
        <button onClick={() => setSelectedMarker(null)}>Close</button>
      </div>
      <div className="p-4">
        <img src={Logo} alt="Logo" className="w-48 h-36 mx-auto" />
        <h3 className="text-2xl font-semibold">{data.name}</h3>
        <p className="mt-1">{data.description}</p>
        <p className="mt-3">{data.longDescription}</p>
        <p className="mt-5">
          <strong>Address:</strong> {data.address}
        </p>
        <p className="mt-1">
          <strong>Phone:</strong> {data.phone}
        </p>
      </div>
    </div>
  );
};

export default Drawer;