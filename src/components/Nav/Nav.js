import React, { useContext } from "react";
import { LanguageContext } from "../../Language";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import logo from "../../assets/logo/logoskull.png";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import { useAuth } from "../../hooks/useAuth";
import { supabase } from "../../lib/supabase";

function Nav() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [lang, setLang] = useState(null);
  const open = Boolean(lang);

  const { dictionary, userLanguage } = useContext(LanguageContext);
  const { session, profile, isPaid } = useAuth();
  const isFr = userLanguage === "fr";

  const expiryLabel = profile?.end_date
    ? new Date(profile.end_date).toLocaleDateString(
        isFr ? "fr-FR" : "en-GB",
        { day: "numeric", month: "short" }
      )
    : null;

  async function handleSignOut() {
    await supabase.auth.signOut();
  }

  const handleClose = () => {
    setLang(null);
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  //get the headings
  const headings = dictionary.nav;
  return (
    <AppBar position="static" className="bg-gray-900 max-w-screen-xl mx-auto ">
      <Container maxWidth="2xl" className="bg-gray-900">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              fontFamily: "oswald",
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <a href="/" className="flex items-center">
              <img
                src={logo}
                className="h-6 mr-3 sm:h-9"
                alt="briancon fantomes logo"
              />
            </a>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              className="hover:text-red-700"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {headings.map((i) => (
                
                <MenuItem onClick={handleCloseNavMenu} key={i.id}>
                  <a href={`#${i.link}`}>
                    <Typography className="text-black " sx={{ minWidth: 100 }}>
                      {i.title}
                    </Typography>
                  </a>
                </MenuItem>
              ))}

              <MenuItem>
                <LanguageSelector styling="border-none bg-white font-Roboto" />
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "oswald",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <a href="/" className="flex items-center">
              <img
                src={logo}
                className="h-6 mr-3 sm:h-9"
                alt="briancon fantomes logo"
              />
            </a>
          </Typography>
          <Box
            className="flex justify-left items-center"
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
          >
            {headings.map((i) => (
              <a href={`#${i.link}`} key={i.id}>
                <Typography className="text-white flex justify-center" sx={{ minWidth: 100 }}>
                  {i.title}
                </Typography>
              </a>
            ))}
            <LanguageSelector styling="border-none bg-gray-900 font-Roboto px-8" />
          </Box>

          <Menu
            anchorEl={lang}
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
          ></Menu>

          {/* Account indicator */}
          {session && (
            <Box sx={{ display: "flex", alignItems: "center", mr: 1, gap: 1 }}>
              <div className="flex flex-col items-end">
                <span className="text-gray-300 text-xs leading-tight max-w-[120px] truncate hidden sm:block">
                  {session.user.email}
                </span>
                {isPaid && expiryLabel && (
                  <span className="text-yellow-400 text-xs leading-tight hidden sm:block">
                    {isFr ? `Accès jusqu'au ${expiryLabel}` : `Access until ${expiryLabel}`}
                  </span>
                )}
              </div>
              <button
                onClick={handleSignOut}
                className="text-gray-400 hover:text-white text-xs border border-gray-600 hover:border-gray-400 rounded px-2 py-1 transition-colors whitespace-nowrap"
              >
                {isFr ? "Déconnexion" : "Sign out"}
              </button>
            </Box>
          )}

          <a href="#tour">
            <Box
              sx={{
                flexGrow: 0,
                marginTop: ".375rem",
                marginBottom: ".375rem",
              }}
            >
              <button
                type="button"
                className=" border-solid border-white border-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-lg px-1.5 py-1.5 text-center mx-4 md:dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                {dictionary.button}
              </button>
            </Box>
          </a>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Nav;
