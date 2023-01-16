import React, { useState, useRef } from "react";
import logo from "../../assets/logo/logoskull.png";
import englishFlag from "../../assets/photos/englishFlag.jpg";
import frenchFlag from "../../assets/photos/frenchFlag.jpg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import "./Navbar.scss";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("navbar__toggle");
  };

  return (
    <div className="navbar bg-gray-900 px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div
        ref={navRef}
        className="navbar__wrapper container flex flex-wrap items-center justify-between mx-auto"
      >
        <div className="navbar__left bg-gray-900">
          <div className="navbar__arrow-group bg-gray-900">
            <img src={logo} alt="briancon fantomes logo" className="h-8" />
          </div>
          <IconButton
            onClick={showNavbar}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "language" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              <img className="h-full" src={englishFlag} alt="english" />
            </Avatar>
          </IconButton>

          <div className="navbar__right">
            <div to="/" className="navbar__div" onClick={showNavbar}>
              Home
            </div>
            <div to="/" className="navbar__div">
              About
            </div>
            <div to="/" className="navbar__div">
              Contact
            </div>
            <div to="/" className="navbar__div">
              Store
            </div>
            <div className="navbar__icons">
              <SearchIcon />
              <PersonOutlineIcon />
              <FavoriteBorderIcon />
              <div
                className="navbar__cart-icon"
                onClick={() => setOpen(!open)}
              ></div>
            </div>
          </div>
          <button className="navbar__btn" onClick={showNavbar}>
            <CloseIcon />
          </button>
        </div>

        <div to="/" className="navbar__div navbar__brand navbar__brand-mobile">
          Viishculza
        </div>

        <button className="navbar__btn" onClick={showNavbar}>
          <MenuIcon />
        </button>

        <div
          className="navbar__btn navbar__btn--cart navbar__cart-icon"
          onClick={() => setOpen(!open)}
        ></div>
      </div>
    </div>
  );
};

export default Navbar;
