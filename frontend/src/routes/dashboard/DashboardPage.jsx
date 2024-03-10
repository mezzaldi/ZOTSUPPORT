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
            console.log("FOLLOWED PROGRAMS: ", res.data);
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

    // Get the program's administrators
    const [admins, setAdmins] = useState();
    useEffect(() => {
        const getAdmins = async () => {
            const res = await axios
                .get(
                    `http://localhost:3001/programs/:${userData.program_id}/administrators`
                )
                .catch((err) => console.log(err));
            setAdmins(res.data);
        };
        getAdmins();
    }, [userData]);

    // Get the programs's upcoming events [IF A PROGRAM DASHBOARD]
    const [upcomingEvents, setUpcomingEvents] = useState();
    // TEST PROGRAM ID
    const programId = 1;
    useEffect(() => {
        const getUpcomingEvents = async () => {
            const res = await axios
                .get(
                    `http://localhost:3001/programs/${programId}/events/upcoming`
                )
                .catch((err) => console.log(err));
            setUpcomingEvents(res.data);
        };
        getUpcomingEvents();
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
                    {userData.firstname}'s Dashboard
                </Typography>

                <div>
                    <Link to="/ProgramEvents">
                        <Button variant="outlined" sx={{ marginRight: "10px" }}>
                            Program events
                        </Button>
                    </Link>
                    <Link to="/ProgramHomePage">
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
                        {upcomingEvents &&
                            upcomingEvents.map((eventData) => {
                                console.log(eventData);
                                return <EventBar data={eventData} />;
                            })}
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
                        {admins && <AdminTable rowsPerPage={5} data={admins} />}
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

            <div>
                <div className="h2Container">
                    <Typography variant="h2">Followed programs</Typography>
                </div>
                {followedPrograms && (
                    <CardCarousel cardType="program" data={followedPrograms} />
                )}
            </div>
        </div>
    );
};

export default DashboardPage;
