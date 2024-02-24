import React from "react";
import { useContext, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

import NotificationTable from "../../components/NotificationTable";
import CardCarousel from "../../components/CardCarousel";
import EventBar from "../../components/EventBar";
import AdminTable from "../../components/AdminTable";

import UserContext from "../../user/UserContext";
import axios from "axios";
import { useState } from "react";
import AddAdminModal from "../../components/AddAdminModal";
import RemoveAdminModal from "../../components/RemoveAdminModal";

const DashboardPage = () => {
    const userData = useContext(UserContext);

    // Get the user's followed programs.
    const [followedPrograms, setFollowedPrograms] = useState();
    useEffect(() => {
        const getFollowedPrograms = async () => {
            const res = await axios
                .get(
                    `http://localhost:3001/followedPrograms/:${userData.ucinetid}`
                )
                .catch((err) => console.log(err));
            setFollowedPrograms(res.data);
        };
        getFollowedPrograms();
    }, [userData]);

    // Get the user's notifications
    const [notifications, setNotifications] = useState();
    useEffect(() => {
        const getNotifications = async () => {
            const res = await axios
                .get(
                    `http://localhost:3001/notifications/:${userData.ucinetid}`
                )
                .catch((err) => console.log(err));
            setNotifications(res.data);
        };
        getNotifications();
    }, [userData]);

    return (
        <div className="pageContent">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                    justifyContent: "space-between",
                }}
            >
                <Typography variant="h1">
                    {userData.name}'s Dashboard
                </Typography>

                <div>
                    <Link to="/ProgramEvents">
                        <Button variant="outlined" sx={{ marginRight: "10px" }}>
                            Program events
                        </Button>
                    </Link>
                    <Link to="/ProgramHome">
                        <Button variant="outlined">Program home</Button>
                    </Link>
                </div>
            </Box>

            <div className="eventBarsAndCalendar">
                <div>
                    <div className="h2Container">
                        <Typography variant="h2">
                            Your upcoming events
                        </Typography>
                    </div>
                    <div>
                        <EventBar />
                        <EventBar />
                        <EventBar />
                        <EventBar />
                        <EventBar />
                    </div>
                </div>

                {/* calendar widget */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar />
                </LocalizationProvider>
            </div>

            <div>
                <div className="h2Container">
                    <Typography variant="h2">Notifications</Typography>
                </div>
                {/* make sure notifs are loaded in */}
                {notifications && (
                    <div className="tableContainer">
                        <NotificationTable
                            rowsPerPage={10}
                            data={notifications}
                        />
                    </div>
                )}
            </div>

            {/* Program admin table only shownt to admin or superadmin */}
            {(userData.role === "admin" || userData.role === "superadmin") && (
                <div>
                    <div className="h2Container">
                        <Typography variant="h2">
                            Program administrators
                        </Typography>
                    </div>
                    <div className="tableContainer">
                        <AdminTable rowsPerPage={5} />
                    </div>
                </div>
            )}

            {/* Buttons to change admins only shown to superadmin */}
            {userData.role === "superadmin" && (
                <div>
                    <AddAdminModal />
                    <RemoveAdminModal />
                </div>
            )}

            {/* Make sure followedPrograms is loaded in */}
            {followedPrograms && (
                <div>
                    <div className="h2Container">
                        <Typography variant="h2">Followed programs</Typography>
                    </div>
                    <CardCarousel
                        cardType="program"
                        data={followedPrograms.map((item) => item.program_id)}
                    />
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
