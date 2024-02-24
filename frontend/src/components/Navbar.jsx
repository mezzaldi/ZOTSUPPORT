import React from "react";
import { useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"; 
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Navbar = ({ isAdmin = false }) => { // isAdmin prop to determine if the user is an admin
  const location = useLocation();

  const isLandingPage = location.pathname === "/LandingPage";

  return (
    <AppBar position="static" sx={{ backgroundColor: "#0E1C4C", minHeight: "4rem", justifyContent: "center" }}>
      <Toolbar variant="dense">
        <Typography variant="h2" color="inherit" sx={{ flexGrow: 1 }}>Zot Support</Typography>
        <Stack direction="row" spacing={2}>
          {isLandingPage ? (
            // Render only About and Sign-in for the Landing Page
            <>
              <Button href="/About" startIcon={<SearchIcon />} sx={{ color: "white" }}>
                <Typography variant="h3" color="inherit">About</Typography>
              </Button>
              <Button href="/sign-in" sx={{ color: "white" }}>
                <Typography variant="h3" color="inherit">Sign in</Typography>
              </Button>
            </>
          ) : (
            // Render the General Navigation for other pages
            <>
              <Button href="/About" startIcon={<SearchIcon />} sx={{ color: "white" }}>
                <Typography variant="h3" color="inherit">About</Typography>
              </Button>
              <Button href="/Discover" startIcon={<SearchIcon />} sx={{ color: "white" }}>
                <Typography variant="h3" color="inherit">Discover</Typography>
              </Button>
              <Button href="/Notifications" startIcon={<NotificationsIcon />} sx={{ color: "white" }}>
                <Typography variant="h3" color="inherit">Notifications</Typography>
              </Button>
              <Button href="/Dashboard" startIcon={<DashboardIcon />} sx={{ color: "white" }}>
                <Typography variant="h3" color="inherit">Your dashboard</Typography>
              </Button>
              {isAdmin && (
                // Admin's Dashboard button only visible to admin users
                <Button href="/ProgramDashboard" startIcon={<AdminPanelSettingsIcon />} sx={{ color: "white" }}>
                  <Typography variant="h3" color="inherit">Program Dashboard</Typography>
                </Button>
              )}
            </>
          )}
          {!isLandingPage && (
            // Profile button only visible on non-Landing Pages
            <Button endIcon={<ArrowDropDownIcon />} sx={{ color: "white" }}>
              <img src="/images/placeholder.jpg" className="profileImg" alt="student profile" style={{ width: 30, height: 30, borderRadius: '50%' }}></img>
              <Typography variant="h3" color="inherit">User's Name</Typography>
            </Button>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
