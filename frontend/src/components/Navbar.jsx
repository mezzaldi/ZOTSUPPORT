import React from "react";
import { useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Navbar = ({ userData }) => {
    // Use userData prop to access user information
    const location = useLocation();

    const isLandingPage = location.pathname === "/LandingPage";
    // Determine if the user is an admin or superadmin
    const isAdmin =
        userData?.role === "admin" || userData?.role === "superadmin";

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: "#0E1C4C",
                minHeight: "4rem",
                justifyContent: "center",
            }}
        >
            <Toolbar variant="dense">
                <Typography variant="h2" color="inherit" sx={{ flexGrow: 1 }}>
                    ZOTSUPPORT
                </Typography>
                <Stack direction="row" spacing={2}>
                    {isLandingPage ? (
                        <>
                            <Button
                                href="/About"
                                startIcon={<SearchIcon />}
                                sx={{ color: "white" }}
                            >
                                <Typography variant="h3" color="inherit">
                                    About
                                </Typography>
                            </Button>
                            <Button href="/sign-in" sx={{ color: "white" }}>
                                <Typography variant="h3" color="inherit">
                                    Sign in
                                </Typography>
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                href="/Discover"
                                startIcon={<SearchIcon />}
                                sx={{ color: "white" }}
                            >
                                <Typography variant="h3" color="inherit">
                                    Discover
                                </Typography>
                            </Button>
                            <Button
                                href="/Notifications"
                                startIcon={<NotificationsIcon />}
                                sx={{ color: "white" }}
                            >
                                <Typography variant="h3" color="inherit">
                                    Notifications
                                </Typography>
                            </Button>
                            <Button
                                href="/Dashboard"
                                startIcon={<DashboardIcon />}
                                sx={{ color: "white" }}
                            >
                                <Typography variant="h3" color="inherit">
                                    Your dashboard
                                </Typography>
                            </Button>
                            {isAdmin && (
                                <Button
                                    href="/ProgramDashboard"
                                    startIcon={<AdminPanelSettingsIcon />}
                                    sx={{ color: "white" }}
                                >
                                    <Typography variant="h3" color="inherit">
                                        Program Dashboard
                                    </Typography>
                                </Button>
                            )}
                        </>
                    )}
                    {!isLandingPage && (
                        <Button
                            endIcon={<ArrowDropDownIcon />}
                            sx={{ color: "white" }}
                        >
                            <img
                                src="/images/placeholder.jpg"
                                className="profileImg"
                                alt="student profile"
                                style={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: "50%",
                                }}
                            ></img>
                            <Typography variant="h3" color="inherit">
                                User's Name
                            </Typography>
                        </Button>
                    )}
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
