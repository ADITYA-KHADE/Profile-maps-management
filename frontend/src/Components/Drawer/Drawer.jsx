import React from "react";

const Drawer = ({ data }) => {
  return (
    <div
      className="fixed top-0 right-0 w-96 h-full bg-white shadow-lg transform transition-transform translate-x-0"
      style={{ zIndex: 999 }}
    >
      <div className="p-4">
        <h3 className="text-2xl font-semibold">{data.name}</h3>
        <p className="mt-2"><strong>Description:</strong> {data.description}</p>
        <p><strong>Address:</strong> {data.address}</p>
        <img
          src={data.photo}
          alt={data.name}
          className="mt-4 w-full h-auto rounded-lg"
        />
      </div>
    </div>
  );
};

export default Drawer;
