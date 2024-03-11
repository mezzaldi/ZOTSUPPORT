import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import UserContext from "../../user/UserContext";

const EventHomePage = () => {
    let { event_id } = useParams(); // Retrieve event ID from URL parameters
    event_id = event_id.replace(":", ""); // Remove any colon prefix
    const navigate = useNavigate(); // Initialize navigate function for redirection

    const userData = useContext(UserContext); // Access user data from context

    const [event, setEvent] = useState(null); // State for holding event data

    // Effect hook to fetch event data when component mounts or event_id/userData changes
    useEffect(() => {
        const getEvent = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/events/${event_id}`);
                setEvent(res.data); // Set fetched event data to state
            } catch (err) {
                console.log(err); // Log any errors
            }
        };
        getEvent();
    }, [event_id, userData]);

    return (
        <div className="pageContent">
            {event && (
                <div>
                    <img
                        src={"/images/placeholder.jpg"}
                        alt="Event Header"
                        width="100%"
                        height="250px"
                        style={{ objectFit: "cover", objectPosition: "center" }}
                    />

                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingTop: "2rem",
                        paddingBottom: "2rem",
                    }}>
                        <div>
                            <Typography variant="h1">{event.name}</Typography>
                            <Typography variant="h3">Hosted by: {event.program_name}</Typography>
                        </div>

                        <Box> 
                            <div className="eventTitle">
                                <Button variant="outlined">View Program Page</Button>

                                {userData.role === "superadmin" && (
                                    <Button variant="contained" onClick={() => navigate(`/EditEventForm/${event_id}`, { state: { event } })}>Edit</Button>
                                )}

                                {userData.role === "student" && event.requireregistration && (
                                     <Button variant="contained">Register</Button>
                                )}
                            </div>
                        </Box>
                    </Box>
                
                    <div className="h2Container">
                        <Typography variant="h2">Start Time: {event.starttime}</Typography>
                    </div>

                    <div className="h2Container"> 
                        <Typography variant="h2">End Time: {event.endtime}</Typography>
                    </div>

                    <div className="h2Container">
                        <Typography variant="body1">{event.description}</Typography>
                    </div>    

                    <Stack direction="row" spacing={1} sx={{ marginTop: "1rem" }}>
                        {event.tags && event.tags.map(tag => (
                            <Chip key={tag.tag_name} label={tag.tag_name} sx={{ backgroundColor: tag.tag_color, color: "white" }} />
                        ))}
                    </Stack>
                </div>
            )}
        </div>
    );
};

export default EventHomePage;
