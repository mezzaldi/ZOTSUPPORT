import React, { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, Button, Chip, Stack } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import UserContext from "../../user/UserContext";
import LongEventCard from "../../components/LongEventCard";

const ProgramHomePage = () => {
    let { program_id } = useParams();
    program_id = program_id.replace(":", "");

    console.log("CREATED PROGRAM PAGE");

    const userData = useContext(UserContext);
    const [program, setProgram] = useState();

    useEffect(() => {
        const getProgram = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/programs/${program_id}`);
                setProgram(res.data);
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getProgram();
    }, [userData]);

    // Get upcoming events
    const [upcomingEvents, setUpcomingEvents] = useState();
    useEffect(() => {
        const getUpcomingEvents = async () => {
            const res = await axios
                .get(
                    `http://localhost:3001/programs/:${program_id}/events/upcoming`
                )
                .catch((err) => console.log(err));
            setUpcomingEvents(res.data);
            console.log(res.data)
        };
        getUpcomingEvents();
    }, [userData]);


    return (
        <div className="pageContent">
            {program && (
                <div>
                    <img
                        src={"/images/placeholder.jpg"}
                        alt="program header"
                        width="100%"
                        height="250px"
                        style={{ objectFit: "cover", objectPosition: "center" }}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingTop: "2rem",
                            paddingBottom: "2rem",
                        }}
                    >
                        <Typography variant="h1">
                            {program.name}
                        </Typography>
                        {userData.role === "superadmin" && (
                            <Box>
                                <Link to={`/EditProgramForm/${program_id}`}>
                                     <Button variant="contained">Edit</Button>
                             </Link>
                            </Box>
                        )}

                        {userData.role === "student" && (
                            <Button variant="contained">Follow</Button>
                        )}
                    </Box>
                    <Typography variant="body1">
                        {program.description}
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{ marginTop: "1rem" }}
                    />
                
                        {program.tags && (
                            program.tags.map(tag => 
                                <Chip label={tag.tag_name}
                                sx={{ backgroundColor: tag.tag_color, color: "white" }} />
                            )
                        )}
                    <Stack direction="row" spacing={1} sx={{ marginTop: "1rem" }}>
                        {/* Later load in these tags from the database!! */}
                        <Chip
                            label="Undergrad"
                            sx={{ backgroundColor: "green", color: "white" }}
                        />
                        <Chip
                            label="Math"
                            sx={{ backgroundColor: "purple", color: "white" }}
                        />
                        <Chip
                            label="Biology"
                            sx={{ backgroundColor: "orange", color: "white" }}
                        />
                        <Chip
                            label="Walk-in"
                            sx={{ backgroundColor: "red", color: "white" }}
                        />
                    </Stack>
                    <Typography variant="h2" sx={{ marginTop: "3rem", marginBottom: "2rem" }}>
                        Upcoming events
                    </Typography>
                    <Box>
                        {upcomingEvents && (
                            upcomingEvents.map(event =>
                                <LongEventCard data={event} event_id={event.event_id}/>
                            )
                        )}

                        {/* <LongEventCard title={"Upcoming Event name"} />
                        <LongEventCard title={"Upcoming Event name"} />
                        <LongEventCard title={"Upcoming Event name"} />
                        <LongEventCard title={"Upcoming Event name"} />
                        <LongEventCard title={"Upcoming Event name"} /> */}
                    </Box>
                    {/* Other program details */}
                    <Typography variant="h2">Other Program Details</Typography>
                    <Typography variant="body1">Details go here...</Typography>
                </div>
            )}
        </div>
    );
};

export default ProgramHomePage;
