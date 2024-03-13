import React from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import AdminTable from "../../components/AdminTable";

import { Button } from "@mui/material";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import UserContext from "../../user/UserContext";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const EventHomePage = () => {
    let { event_id } = useParams();
    event_id = event_id.replace(":", "");
    const navigate = useNavigate();


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

    const [admins, setAdmins] = useState();
    useEffect(() => {
        const getAdmins = async () => {
            const res = await axios
                .get(`http://localhost:3001/events/:${event_id}/administrators`)
                .catch((err) => console.log(err));
            setAdmins(res.data);
            console.log(res.data)
        };
        getAdmins();
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

                            <Button variant="outlined" 
                                    onClick={() => navigate(`/ProgramHomePage/:${event.program_id}`)}
                                          >View Program Page</Button>


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
                    <Typography variant="h2">
                        Location: {event.location}
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
                
                <Typography
                        variant="h2"
                        sx={{ marginTop: "3rem"}}
                    >
                        Staff:
                    </Typography>

                <div className="tableContainer">
                    {admins && (
                        <AdminTable rowsPerPage={5} data={admins} />
                    )}
                </div>   



                </div>
            )}
        </div>



    );
};

export default EventHomePage;

