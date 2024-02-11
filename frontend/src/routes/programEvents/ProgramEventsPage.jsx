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

const ProgramEventsPage = () => {
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
                {currentTab === 1 && (
                    <Box sx={{}}>
                        <LongEventCard title={"Upcoming Event name"} />
                        <LongEventCard title={"Upcoming Event name"} />
                        <LongEventCard title={"Upcoming Event name"} />
                    </Box>
                )}

                {currentTab === 2 && (
                    <Box sx={{}}>
                        <LongEventCard title={"Previous Event name"} />
                        <LongEventCard title={"Previous Event name"} />
                        <LongEventCard title={"Previous Event name"} />
                    </Box>
                )}
            </Box>
        </div>
    );
};

export default ProgramEventsPage;
