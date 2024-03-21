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

    const userData = useContext(UserContext);
    const userInfo = {
        ucinetid: userData.ucinetid
    }
    const [program, setProgram] = useState();

    // Check if the user is a super administrator for this program
    const isSuperAdmin = userData.superadminprograms.includes(program_id)
        ? true
        : false;

    // Check if the user is a regular administrator for this program
    const isAdmin = userData.adminprograms.includes(program_id) ? true : false;

    useEffect(() => {
        const getProgram = async () => {
            const res = await axios
                .get(`http://localhost:3001/programs/:${program_id}`)
                .catch((err) => console.log(err));
            setProgram(res.data);
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
        };
        getUpcomingEvents();
    }, [userData]);

    // Add user to program followers
    const handleAddFollowChange  = async (e) => {
        try {
            const response = await axios.post(
                `http://localhost:3001/programs/:${program_id}/followers`, userInfo);
            console.log("Follower added successfully:", response.data);
            // You can handle the success response accordingly
        } catch (error) {
            console.error("Follower not added to program:", error);
            // Handle the error appropriately
        }

    };




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
                        <Typography variant="h1">{program.name}</Typography>
                        {isSuperAdmin && (
                            <Box>
                                <Link to={`/EditProgramForm/${program_id}`}>
                                    <Button variant="contained">Edit</Button>
                                </Link>
                            </Box>
                        )}

                        {userData.role === "student" && (
                            <Button variant="contained" onClick={handleAddFollowChange}>Follow</Button>
                        )}

                    </Box>
                    <Typography variant="body1">
                        {program.description}
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{ marginTop: "1rem" }}
                    >
                        {program.tags &&
                            program.tags.map((tag) => (
                                <Chip
                                    label={tag.tag_name}
                                    sx={{
                                        backgroundColor: tag.tag_color,
                                        color: "white",
                                    }}
                                />
                            ))}
                    </Stack>
                    <Typography
                        variant="h2"
                        sx={{ marginTop: "3rem", marginBottom: "2rem" }}
                    >
                        Upcoming events
                    </Typography>
                    <Box>
                        {upcomingEvents &&
                            upcomingEvents.map((event) => (
                                <LongEventCard
                                    data={event}
                                    event_id={event.event_id}
                                />
                            ))}
                    </Box>
                </div>
            )}
        </div>
    );
};

export default ProgramHomePage;
