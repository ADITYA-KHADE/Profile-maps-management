import React from "react";
import Logo from "../../assets/mark.png";
import { useTheme } from "../../Contexts/ThemeContext";
import { FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
const Drawer = ({ data, setSelectedMarker }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`fixed bottom-0 w-full md:top-0 md:right-0 md:w-1/4 h-1/2 md:h-full ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } shadow-lg transform transition-transform translate-x-0 md:translate-y-0`}
      style={{ zIndex: 999 }}
    >
      {/* Close Button */}
      <div className="flex justify-end p-2 border-b">
        <button
          className={`${
            theme === "dark" ? "text-white" : "text-gray-900"
          } focus:outline-none`}
          onClick={() => setSelectedMarker(null)}
        >
          <MdOutlineCancel />
        </button>
      </div>

     
      <div className="p-4 text-center">
        <img src={data.photo ? data.photo :Logo} alt="Logo" className="w-48 h-44 mx-auto" />
        <h3 className="text-2xl mt-2 font-semibold">{data.name}</h3>
        <p className="mt-2">{data.description}</p>
        <p className="mt-3">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere, aut
          perspiciatis incidunt repellendus nemo velit optio! Et nihil quia in,
          voluptatum aliquid, nisi, laudantium minima labore quod esse quaerat
          pariatur.
        </p>
        <p className="mt-6 flex items-center justify-center">
          <FaMapMarkerAlt className="mr-2" /> {data.address}
        </p>
        <p className="mt-1 flex items-center justify-center">
          <FaPhone className="mr-2" /> 12345 12345
        </p>
      </div>
    </div>
  );
};

export default Drawer;
