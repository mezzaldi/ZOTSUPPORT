import React from "react";
import Typography from "@mui/material/Typography";
import LongEventCard from "../../components/LongEventCard";
import { Box } from "@mui/material";

import { Button } from "@mui/material";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import UserContext from "../../user/UserContext";
import axios from "axios";
import { useState } from "react";

const EventHomePage = () => {
    let { event_id } = useParams();
    event_id = event_id.replace(":", "");

    const userData = useContext(UserContext);

    const [event, setEvent] = useState();
    useEffect(() => {
        const getEvent = async () => {
            const res = await axios
                .get(`http://localhost:3001/events/:${event_id}`)
                .catch((err) => console.log(err));
            setEvent(res.data[0]);
            console.log(res.data);
        };
        getEvent();
    }, [userData])


    return (
        <div class="pageContent">
            {event &&(
                <div>
                    <img
                        src={"/images/placeholder.jpg"}
                        alt="program header"
                        width="100%"
                        height="250px"
                        style={{ objectFit: "cover", objectPosition: "center" }}
                    ></img>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingTop: "2rem",
                            paddingBottom: "2rem",
                        }}
                    >
                        <div>
                            <div>
                                <Typography variant="h1">
                                {event.event_name}
                                </Typography>
                            </div>
                            <div >
                                <Typography variant="h3">
                                Hosted by: {event.program_name}
                                </Typography>
                            </div>
                        </div>
                        <Box m={2}> 
                            <Button variant="outlined">View Program Page</Button>

                            {userData.role === "superadmin" && (
                                <Button variant="contained">Edit</Button>
                             )}

                            {userData.role === "student" && (
                                 <Button variant="contained">Register</Button>
                            )}

                        </Box>

                </Box>
                </div>
            )}
        </div>



    );
};

export default EventHomePage;

