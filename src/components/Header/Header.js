import * as React from "react";
import logo from "../../assets/logo/logoskull.png";
import englishFlag from "../../assets/photos/englishFlag.jpg";
import frenchFlag from "../../assets/photos/frenchFlag.jpg";
import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorMenu, setAnchorMenu] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleNavOpen = (event) => {
    setAnchorMenu(event.currentTarget);
  };
  const handleNavClose = () => {
    setAnchorMenu(null);
  };
  //const navRef = useRef();

  // const showNavbar = () => {
  //   navRef.current.classList.toggle("navbar__toggle");
  // };

  return (
    <nav className="bg-gray-900 px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a href="/" className="flex items-center">
          <img
            src={logo}
            className="h-6 mr-3 sm:h-9"
            alt="briancon fantomes logo"
          />
        </a>
        <div
          className="flex justify-around items-center md:order-2 ml-auto"
          onClick={handleNavOpen}
        >
          <button
            type="button"
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-8 md:mr-0 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Start Show
          </button>
          <button className="flex md:hidden text-white" onClick={handleClick}>
            <MenuIcon />
          </button>
          <React.Fragment>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div className="hidden md:flex justify-center items-center">
                <button className="flex md:hidden text-white">
                  <CloseIcon />
                </button>
                <a href="#about">
                  <Typography className="text-white" sx={{ minWidth: 100 }}>
                    About
                  </Typography>
                </a>
                <Typography className="text-white" sx={{ minWidth: 100 }}>
                  Contact
                </Typography>
                <Typography className="text-white" sx={{ minWidth: 100 }}>
                  FAQ
                </Typography>
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
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
                </Tooltip>
              </div>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="language"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem>
                <Avatar>
                  <img className="h-full" src={frenchFlag} alt="french" />
                </Avatar>{" "}
                French
              </MenuItem>
            </Menu>
          </React.Fragment>
        </div>
      </div>
    </nav>
  );
}

export default Header;
