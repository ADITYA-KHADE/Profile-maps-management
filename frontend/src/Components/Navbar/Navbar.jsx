import React, { useState, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../../Contexts/ThemeContext";
import { useAuthContext } from "../../Contexts/AuthContext";
import { IoLogOutOutline } from "react-icons/io5";

const navigation = [
  { name: "Products", id: "products" },
  { name: "Add Product", id: "addproduct" },
];

const Navbar = ({ activetab, setActivetab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { theme, setTheme } = useTheme();
  const { authUser, setAuthUser } = useAuthContext();

  const logoutall = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status === 200) {
        localStorage.removeItem("user");
        setAuthUser(null);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message, "logout");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header
      className={`${
        theme === "dark"
          ? "bg-gray-800 text-white"
          : "bg-slate-100 text-gray-900"
      } sticky top-0 z-50 px-1 shadow-lg`}
    >
      <nav
        className="flex items-center gap-10 justify-between w-full max-w-screen-xl mx-auto p-1"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              className="theme-controller"
              onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
            />
            <svg
              className="swap-off fill-current w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
            <svg
              className="swap-on fill-current w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </div>

        <div className="flex items-center lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <div
              key={item.name}
              className={`cursor-pointer text-base font-semibold leading-6 `}
            >
              {item.name !== "Add Product" ||
              (authUser && authUser.role === "admin") ? (
                <button
                  onClick={() => {
                    setActivetab(item.id);
                  }}
                >
                  {item.name}
                </button>
              ) : null}
            </div>
          ))}
        </div>
        <div className="hidden lg:flex gap-4 lg:flex-1 lg:justify-end items-center">
          <button
            onClick={() => {
              logoutall();
              setAuthUser(null);
            }}
            className="flex items-center gap-2"
          >
            <IoLogOutOutline className="h-6 w-6" />
            <span>Sign Out</span>
          </button>
        </div>
      </nav>
      <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <DialogPanel
          className={`${
            theme === "dark"
              ? "bg-gray-700 text-white"
              : "bg-slate-100 text-gray-900"
          } fixed top-0 right-0 z-50 overflow-y-auto px-4 py-6 lg:hidden w-60 h-full`}
        >
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 fixed top-3 right-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="mt-6 space-y-4">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.name !== "Add Product" ||
                (authUser && authUser.role === "admin") ? (
                  <button
                    onClick={() => {
                      setActivetab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className="text-base font-semibold py-2 px-3"
                  >
                    {item.name}
                  </button>
                ) : null}
              </div>
            ))}
            <button
              onClick={() => {
                logoutall();
                setAuthUser(null);
              }}
              className="flex items-center gap-2 text-base font-semibold py-2 px-3"
            >
              <IoLogOutOutline className="h-6 w-6" />
              <span>Sign Out</span>
            </button>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Navbar;
