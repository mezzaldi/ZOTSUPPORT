import React, { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import LongEventCard from "../../components/LongEventCard";
import { Box, Button, IconButton, InputBase, Paper, Tab, Tabs } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import UserContext from "../../user/UserContext";
import axios from "axios";

const ProgramEventsPage = () => {
    const userData = useContext(UserContext);
    const [searchTerm, setSearchTerm] = useState('');

    const [previousEvents, setPreviousEvents] = useState();
    useEffect(() => {
        const getPreviousEvents = async () => {
            const res = await axios
                .get(`http://localhost:3001/programs/:${userData.program_id}/events/past`)
                .catch((err) => console.log(err));
            setPreviousEvents(res.data);
        };
        getPreviousEvents();
    }, [userData.program_id]);

    const [upcomingEvents, setUpcomingEvents] = useState();
    useEffect(() => {
        const getUpcomingEvents = async () => {
            const res = await axios
                .get(`http://localhost:3001/programs/:${userData.program_id}/events/upcoming`)
                .catch((err) => console.log(err));
            setUpcomingEvents(res.data);
        };
        getUpcomingEvents();
    }, [userData.program_id]);

    const [currentTab, setCurrentTab] = useState(1);
    const handleTabChange = (event, newTab) => {
        setCurrentTab(newTab);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filterEvents = (events) => {
        if (!events) return [];
        return events.filter((event) =>
            (event.name && event.name.toLowerCase().includes(searchTerm.toLowerCase().trim())) ||
            (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase().trim()))
        );
    };
    

    return (
        <div className="pageContent">
            <div className="h1Container">
                <Typography variant="h1">Program name events</Typography>
            </div>

            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <Tabs value={currentTab} onChange={handleTabChange}>
                    <Tab label="Upcoming events" value={1} />
                    <Tab label="Previous events" value={2} />
                </Tabs>
                <Button variant="contained">+ New event</Button>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row", marginTop: "1.5rem", marginBottom: "1.5rem" }}>
                <Paper
                    component="form"
                    sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: "50%" }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search for an event"
                        inputProps={{ "aria-label": "search for an event" }}
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <IconButton
                        type="submit"
                        sx={{ p: "10px" }}
                        aria-label="search"
                        onClick={(e) => e.preventDefault()}
                    >
                        <SearchIcon />
                    </IconButton>
                </Paper>
                <Button variant="outlined" sx={{ marginLeft: "1rem" }}>Filter results</Button>
            </Box>

            <Box>
                {currentTab === 1 && (
                    <Box>
                        {filterEvents(upcomingEvents).map((eventData) => (
                            <LongEventCard key={eventData.id} data={eventData} />
                        ))}
                    </Box>
                )}
                {currentTab === 2 && (
                    <Box>
                        {filterEvents(previousEvents).map((eventData) => (
                            <LongEventCard key={eventData.id} data={eventData} />
                        ))}
                    </Box>
                )}
            </Box>
        </div>
    );
};

export default ProgramEventsPage;
