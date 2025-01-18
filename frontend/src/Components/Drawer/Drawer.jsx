import React from "react";
import Logo from "../../assets/mark.png";

const Drawer = ({ data }) => {
  return (
    <div
      className="fixed top-0 right-0 w-96 h-full bg-white shadow-lg transform transition-transform translate-x-0"
      style={{ zIndex: 999 }}
    >
      <div className="p-4 ">
        <img src={Logo} alt="Logo" className="w-48 h-36 mx-auto" />
        <h3 className="text-2xl font-semibold">{data.name}</h3>
        <p className="mt-1"> {data.description}</p>
        <p className="mt-3 ">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia dolores voluptatem laudantium eligendi corrupti quod sequi amet, cumque iure officiis dolor! Cupiditate doloremque tempore, voluptatum magnam reiciendis saepe nobis laboriosam!</p>
        <p className="mt-5"><strong>Address:</strong> {data.address}</p>
        <p className="mt-1"><strong>Phone:</strong> 12345 12345</p>
        
      </div>
    </div>
  );
};

export default Drawer;
