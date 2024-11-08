import React, { useEffect, useRef, useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { NavDropdown } from "../navDropdown/NavDropdown";
import navItems from "./navItems";
import Logo from "../../../public/Bandmate_logo.png";
import { LoginContext } from "../../context/loginContext/LoginContext";
import { RegisterContext } from "../../context/registerContext/RegisterContext";
import { CurrentUserContext } from "../../context/currentUserContext/CurrentUserContext";
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; // Import AOS styles

const Navbar = () => {
  useEffect(() => {
    AOS.init({});
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const avatarRef = useRef(null);
  const { setVisibleLogin } = useContext(LoginContext);
  const { setVisibleRegister } = useContext(RegisterContext);
  const { isLog, currentUser } = useContext(CurrentUserContext);

  const handleSetVisibleLogin = () => {
    setVisibleLogin(true);
  };

  const handleSetVisibleRegister = () => {
    setVisibleRegister(true);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gray-900 sticky top-0 shadow z-10">
      <div className="flex justify-between items-center md:px-24 md:py-4 px-8 py-2">
        <Link to="/">
          <img className="w-28 md:w-40" src={Logo} alt="Bandmate Logo" />
        </Link>
        <ul className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.address}
                className={({ isActive }) =>
                  isActive
                    ? "text-navItem-active text-lg"
                    : "text-navItem text-lg hover:text-navItem-hover"
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex space-x-6">
          {isLog ? (
            <div className="flex items-center justify-between gap-4 ">
              {currentUser.type === "band" && currentUser.imgpath === "band" ? (
                <img
                  ref={avatarRef}
                  className="bg-slate-50 rounded-full w-14 cursor-pointer"
                  src="./band.png"
                  alt=""
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />
              ) : currentUser.type === "player" &&
                currentUser.imgpath === "player" ? (
                <img
                  ref={avatarRef}
                  className="bg-slate-50 rounded-full w-14 cursor-pointer"
                  src="./musician.png"
                  alt=""
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />
              ) : currentUser.imgpath ? (
                <img
                  ref={avatarRef}
                  className="bg-slate-50 rounded-full w-14 cursor-pointer"
                  src={`http://localhost:3000/images/${currentUser.imgpath}`}
                  alt=""
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />
              ) : (
                <img
                  ref={avatarRef}
                  className="bg-slate-50 rounded-full w-14 cursor-pointer"
                  src="./avatar.png"
                  alt=""
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />
              )}

              {dropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute top-28 right-0 mt-2 bg-white rounded-md shadow-lg z-10"
                >
                  <NavDropdown />
                </div>
              )}
            </div>
          ) : (
            <div>
              <button
                onClick={handleSetVisibleLogin}
                className="bg-primaryButton font-medium text-lg hover:bg-primaryButton-hover text-white px-8 py-[9px] rounded-md mr-4"
              >
                Signin
              </button>

              <button
                className="bg-primaryButton font-medium text-lg hover:bg-primaryButton-hover text-white px-8 py-[9px] rounded-md"
                onClick={handleSetVisibleRegister}
              >
                Signup
              </button>
            </div>
          )}
        </div>
        <button
          className="md:hidden transition duration-300 ease-in-out "
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <img
              className={`md:hidden w-8 transition-opacity duration-300 ease-in-out ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
              src="./close.png"
              alt="Close"
            />
          ) : (
            <img
              className={`md:hidden w-10 transition-opacity duration-300 ease-in-out ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
              src="./burger.png"
              alt="Menu"
            />
          )}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-gray-800">
          <ul className="flex flex-col items-center space-y-4 py-4">
            {navItems.map((item) => (
              <li key={item.label}>
                <NavLink
                  to={item.address}
                  className={({ isActive }) =>
                    isActive
                      ? "text-navItem-active"
                      : "text-navItem hover:text-navItem-hover"
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <div className="flex space-x-3">
              {isLog ? (
                <div className="flex items-center justify-between gap-4 ">
                  {currentUser.type === "band" &&
                  currentUser.imgpath === "band" ? (
                    <img
                      ref={avatarRef}
                      className="bg-slate-50 rounded-full w-14 cursor-pointer"
                      src="./band.png"
                      alt=""
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    />
                  ) : currentUser.type === "player" &&
                    currentUser.imgpath === "player" ? (
                    <img
                      ref={avatarRef}
                      className="bg-slate-50 rounded-full w-14 cursor-pointer"
                      src="./musician.png"
                      alt=""
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    />
                  ) : currentUser.imgpath ? (
                    <img
                      ref={avatarRef}
                      className="bg-slate-50 rounded-full w-14 cursor-pointer"
                      src={`http://localhost:3000/images/${currentUser.imgpath}`}
                      alt=""
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    />
                  ) : (
                    <img
                      ref={avatarRef}
                      className="bg-slate-50 rounded-full w-14 cursor-pointer"
                      src="./avatar.png"
                      alt=""
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    />
                  )}
                  {dropdownOpen && (
                    <div
                      ref={dropdownRef}
                      className="absolute  top-28 right-0 mt-2 bg-white rounded-md shadow-lg z-10"
                    >
                      <NavDropdown />
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleSetVisibleLogin}
                    className="bg-primaryButton hover:bg-primaryButton-hover px-6 py-2 rounded-md text-white transition-colors duration-300 ease-in-out"
                  >
                    Signin
                  </button>

                  <button
                    className="bg-primaryButton hover:bg-primaryButton-hover px-6 py-2 rounded-md text-white transition-colors duration-300 ease-in-out"
                    onClick={handleSetVisibleRegister}
                  >
                    Signup
                  </button>
                </div>
              )}
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
