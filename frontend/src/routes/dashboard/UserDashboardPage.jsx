import React from "react";
import { useContext, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Box from "@mui/material/Box";

import NotificationTable from "../../components/NotificationTable";
import CardCarousel from "../../components/CardCarousel";
import EventBar from "../../components/EventBar";

import UserContext from "../../user/UserContext";
import axios from "axios";
import { useState } from "react";

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

    // Get user's upcoming events they are registered for
    const [upcomingEvents, setUpcomingEvents] = useState();
    useEffect(() => {
        const getUpcomingEvents = async () => {
            const res = await axios
                .get(
                    `http://localhost:3001/users/:${userData.ucinetid}/events/upcoming`
                )
                .catch((err) => console.log(err));
            setUpcomingEvents(res.data);
            console.log(res.data);
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
