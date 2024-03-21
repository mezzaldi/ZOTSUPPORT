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

    // Get data for this event
    const [event, setEvent] = useState();
    useEffect(() => {
        const getEvent = async () => {
            const res = await axios
                .get(`http://localhost:3001/events/:${event_id}`)
                .catch((err) => console.log(err));
            setEvent(res.data);
        };
        getEvent();
    }, [event_id]);

    // Get list of admins for this event
    const [admins, setAdmins] = useState();
    useEffect(() => {
        const getAdmins = async () => {
            const res = await axios
                .get(`http://localhost:3001/events/:${event_id}/administrators`)
                .catch((err) => console.log(err));
            setAdmins(res.data);
        };
        getAdmins();
    }, [event_id]);

    // check if the user is an admin for the program that is hosting this event
    const [isAdmin, setIsAdmin] = useState();
    useEffect(() => {
        if (event) {
            const sa = userData.adminprograms.includes(event.program_id)
                ? true
                : false;
            setIsAdmin(sa);
        }
    }, [event]);

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
                            <div>
                                <Typography variant="h3">
                                    Hosted by: {event.program_name}
                                </Typography>
                            </div>
                        </div>

                        <Box>
                            <div className="eventTitle">
                                <Button
                                    variant="outlined"
                                    onClick={() =>
                                        navigate(
                                            `/ProgramHomePage/:${event.program_id}`
                                        )
                                    }
                                >
                                    View Program Page
                                </Button>

                                {isAdmin && (
                                    <Button
                                        variant="contained"
                                        onClick={() =>
                                            navigate(
                                                `/EditEventForm/${event_id}`,
                                                { state: { event } }
                                            )
                                        }
                                    >
                                        Edit
                                    </Button>
                                )}

                                {!isAdmin &&
                                    event.requireregistration === true && (
                                        <Button variant="contained">
                                            Register
                                        </Button>
                                    )}
                            </div>
                        </Box>
                    </Box>

                    <div className="h2Container">
                        <Typography variant="h2">
                            Start: {new Date(event.date).toString()}
                        </Typography>
                    </div>

                    <div className="h2Container">
                        <Typography variant="h2">
                            End: {new Date(event.endDate).toString()}
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
                        {event.tags &&
                            event.tags.map((tag) => (
                                <Chip
                                    label={tag.tag_name}
                                    sx={{
                                        backgroundColor: tag.tag_color,
                                        color: "white",
                                    }}
                                />
                            ))}
                    </Stack>

                    <Typography variant="h2" sx={{ marginTop: "3rem" }}>
                        Staff:
                    </Typography>

                    <div className="tableContainer">
                        {admins && <AdminTable rowsPerPage={5} data={admins} />}
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventHomePage;
