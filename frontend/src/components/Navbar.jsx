import React from "react";
import { useLocation } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Stack,
    MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Have to recreate theme in order to adjust breakpoints so navbar collapses
// at a bigger width so text on buttons don't wrap

const primaryTextColor = "#242424";
const navTheme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 1100,
            lg: 1500,
            xl: 1920,
        },
    },
    // creating custom colors for our app
    palette: {
        // this is the primary button blue
        primary: {
            main: "#2744A6",
            light: "#2744A6",
            dark: "#2744A6",
            contrastText: "#FFFFFF",
        },
    },
    // setting font standards for our app
    typography: {
        h1: {
            fontSize: 32,
            fontFamily: "Raleway",
            color: primaryTextColor,
        },
        h2: {
            fontSize: 26,
            fontFamily: "Lato",
            color: primaryTextColor,
        },
        h3: {
            fontSize: 18,
            fontFamily: "Open Sans",
            color: primaryTextColor,
        },
        body1: {
            fontSize: 16,
            fontFamily: "Open Sans",
            color: primaryTextColor,
        },
        subtitle1: {
            fontSize: 14,
            fontFamily: "Open Sans",
            color: primaryTextColor,
        },
        button: {
            textTransform: "none",
            fontFamily: "Open Sans",
            fontSize: 16,
        },
    },
});

const Navbar = ({ userData }) => {
    // Use userData prop to access user information

    const location = useLocation();

    const isLandingPage = location.pathname === "/LandingPage";
    // Determine if the user is an admin or superadmin
    const isAdmin =
        userData?.role === "admin" || userData?.role === "superadmin";

    const pages = ["Products", "Pricing", "Blog"];

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <ThemeProvider theme={navTheme}>
            <AppBar position="static" sx={{ backgroundColor: "#0E1C4C" }}>
                <Container maxWidth="xl">
                    <Toolbar
                        disableGutters
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography
                            variant="h2"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: "none", md: "flex" },
                                color: "inherit",
                                textDecoration: "none",
                                flexGrow: 1,
                            }}
                        >
                            ZOTSUPPORT
                        </Typography>

                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: "flex", md: "none" },
                            }}
                        >
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>

                            {/* ITEMS IN THE HAMBURGER MENU */}
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
                                {isLandingPage ? (
                                    <MenuItem>
                                        <Button href="/sign-in">
                                            <Typography
                                                variant="h3"
                                                color="inherit"
                                            >
                                                Sign in
                                            </Typography>
                                        </Button>
                                    </MenuItem>
                                ) : (
                                    <>
                                        <MenuItem>
                                            <Button
                                                href="/Discover"
                                                startIcon={<SearchIcon />}
                                            >
                                                <Typography
                                                    variant="h3"
                                                    color="inherit"
                                                >
                                                    Discover
                                                </Typography>
                                            </Button>
                                        </MenuItem>

                                        <MenuItem>
                                            <Button
                                                href="/Notifications"
                                                startIcon={
                                                    <NotificationsIcon />
                                                }
                                            >
                                                <Typography
                                                    variant="h3"
                                                    color="inherit"
                                                >
                                                    Notifications
                                                </Typography>
                                            </Button>
                                        </MenuItem>

                                        <MenuItem>
                                            <Button
                                                href="/Dashboard"
                                                startIcon={<DashboardIcon />}
                                            >
                                                <Typography
                                                    variant="h3"
                                                    color="inherit"
                                                >
                                                    Your dashboard
                                                </Typography>
                                            </Button>
                                        </MenuItem>

                                        {isAdmin && (
                                            <MenuItem>
                                                {" "}
                                                <Button
                                                    href="/ProgramSelectDashboard"
                                                    startIcon={
                                                        <AdminPanelSettingsIcon />
                                                    }
                                                >
                                                    <Typography
                                                        variant="h3"
                                                        color="inherit"
                                                    >
                                                        Program Dashboard
                                                    </Typography>
                                                </Button>
                                            </MenuItem>
                                        )}
                                    </>
                                )}
                                {!isLandingPage && (
                                    <MenuItem>
                                        <Button startIcon={<SettingsIcon />}>
                                            <Typography
                                                variant="h3"
                                                color="inherit"
                                            >
                                                Settings
                                            </Typography>
                                        </Button>
                                    </MenuItem>
                                )}
                            </Menu>
                        </Box>

                        <Typography
                            variant="h2"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: "flex", md: "none" },
                                flexGrow: 1,
                                color: "inherit",
                                textDecoration: "none",
                            }}
                        >
                            ZOTSUPPORT
                        </Typography>
                        <Box
                            sx={{
                                display: { xs: "none", md: "flex" },
                            }}
                        >
                            {/* EXPANDED NAVBAR BUTTONS */}

                            {isLandingPage ? (
                                <>
                                    <Button
                                        href="/sign-in"
                                        sx={{ color: "white" }}
                                    >
                                        <Typography
                                            variant="h3"
                                            color="inherit"
                                        >
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
                                        <Typography
                                            variant="h3"
                                            color="inherit"
                                        >
                                            Discover
                                        </Typography>
                                    </Button>
                                    <Button
                                        href="/Notifications"
                                        startIcon={<NotificationsIcon />}
                                        sx={{ color: "white" }}
                                    >
                                        <Typography
                                            variant="h3"
                                            color="inherit"
                                        >
                                            Notifications
                                        </Typography>
                                    </Button>
                                    <Button
                                        href="/Dashboard"
                                        startIcon={<DashboardIcon />}
                                        sx={{ color: "white" }}
                                    >
                                        <Typography
                                            variant="h3"
                                            color="inherit"
                                        >
                                            Your dashboard
                                        </Typography>
                                    </Button>
                                    {isAdmin && (
                                        <Button
                                            href="/ProgramSelectDashboard"
                                            startIcon={
                                                <AdminPanelSettingsIcon />
                                            }
                                            sx={{ color: "white" }}
                                        >
                                            <Typography
                                                variant="h3"
                                                color="inherit"
                                            >
                                                Program Dashboard
                                            </Typography>
                                        </Button>
                                    )}
                                </>
                            )}
                            {!isLandingPage && (
                                <Button sx={{ color: "white" }} href="/UserSetting">
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
                                        {userData.firstname +
                                            " " +
                                            userData.lastname}
                                    </Typography>
                                </Button>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
};

export default Navbar;
