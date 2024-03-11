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
            setEvent(res.data);
        };
        getEvent();
    }, [userData])

    console.log(event)

    return (
        <div class="pageContent">

            {event && (
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
                                {event.name}
                                </Typography>
                            </div>
                            <div >
                                <Typography variant="h3">
                                Hosted by: {event.program_name}
                                </Typography>
                            </div>
                        </div>

                        <Box> 
                            <div className="eventTitle">

                            <Button variant="outlined">View Program Page</Button>


                            {userData.role === "superadmin" && (
                                <Button variant="contained">Edit</Button>
                             )}

                            {userData.role === "student" && event.requireregistration == true && (
                                 <Button variant="contained">Register</Button>
                            )}
                            </div>

                        </Box>
                    </Box>
                
                <div className="h2Container">
                    <Typography variant="h2">
                        Start Time: {event.starttime}
                    </Typography>
                </div>

                <div className="h2Container"> 
                    <Typography variant="h2">
                        End Time: {event.endtime}
                    </Typography>
                </div>


                <div className="h2Container">
                    <Typography variant="body1">
                        {event.description}
                    </Typography>
                </div>    

                <Stack
                        direction="row"
                        spacing={1}
                        sx={{ marginTop: "1rem" }}
                    >
                
                        {event.tags && (
                            event.tags.map(tag => 

                                <Chip label={tag.tag_name}
                                sx={{ backgroundColor: tag.tag_color, color: "white" }} />
                            )
                            
                        )}
                    </Stack>      



                </div>
            )}
        </div>



    );
};

export default EventHomePage;

