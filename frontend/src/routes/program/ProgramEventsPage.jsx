import React from "react";
import Typography from "@mui/material/Typography";
import LongEventCard from "../../components/LongEventCard";
import { Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Button } from "@mui/material";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import UserContext from "../../user/UserContext";
import { useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const ProgramEventsPage = () => {
    const userData = useContext(UserContext);

    // Get previous events
    const [previousEvents, setPreviousEvents] = useState();
    useEffect(() => {
        const getPreviousEvents = async () => {
            const res = await axios
                .get(
                    `http://localhost:3001/programs/:${userData.program_id}/events/past`
                )
                .catch((err) => console.log(err));
            setPreviousEvents(res.data);
        };
        getPreviousEvents();
    }, [userData.program_id]);

    // Get upcoming events
    const [upcomingEvents, setUpcomingEvents] = useState();
    useEffect(() => {
        const getUpcomingEvents = async () => {
            const res = await axios
                .get(
                    `http://localhost:3001/programs/:${userData.program_id}/events/upcoming`
                )
                .catch((err) => console.log(err));
            setUpcomingEvents(res.data);
        };
        getUpcomingEvents();
    }, [userData.program_id]);

    const [currentTab, setCurrentTab] = React.useState(1);
    const handleTabChange = (event, newTab) => {
        setCurrentTab(newTab);
    };

    return (
        <div class="pageContent">
            <div className="h1Container">
                <Typography variant="h1">Program name events</Typography>
            </div>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Tabs value={currentTab} onChange={handleTabChange}>
                    <Tab label="Upcoming events" value={1} />
                    <Tab label="Previous events" value={2} />
                </Tabs>

                <Button variant="contained">+ New event</Button>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "1.5rem",
                    marginBottom: "1.5rem",
                }}
            >
                <Paper
                    component="form"
                    sx={{
                        p: "2px 4px",
                        display: "flex",
                        alignItems: "center",
                        width: "50%",
                    }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search for an event"
                        inputProps={{ "aria-label": "search for an event" }}
                    />
                    <IconButton
                        type="button"
                        sx={{ p: "10px" }}
                        aria-label="search"
                    >
                        <SearchIcon />
                    </IconButton>
                </Paper>

                <Button variant="outlined" sx={{ marginLeft: "1rem" }}>
                    Filter results
                </Button>
            </Box>

            <Box>
                {/* UPCOMING EVENTS */}
                {currentTab === 1 && (
                    <Box>
                        {upcomingEvents &&
                            upcomingEvents.map((eventData) => {
                                console.log(eventData);
                                return <LongEventCard data={eventData} />;
                            })}
                    </Box>
                )}

                {/* PREVIOUS EVENTS */}
                {currentTab === 2 && (
                    <Box>
                        {previousEvents &&
                            previousEvents.map((eventData) => {
                                console.log(eventData);
                                return <LongEventCard data={eventData} />;
                            })}
                    </Box>
                )}
            </Box>
        </div>
    );
};

export default ProgramEventsPage;
