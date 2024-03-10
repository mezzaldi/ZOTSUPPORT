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

const ProgramHomePage = () => {
    let { program_id } = useParams();
    program_id = program_id.replace(":", "");

    console.log("CREATED PROGRAM PAGE");

    const userData = useContext(UserContext);

    const [program, setProgram] = useState();
    useEffect(() => {
        const getProgram = async () => {
            const res = await axios
                .get(`http://localhost:3001/programs/:${program_id}`)
                .catch((err) => console.log(err));
            setProgram(res.data);
            console.log(res.data);
        };
        getProgram();
    }, [userData]);

    return (
        <div class="pageContent">
            {program && (
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
                        <Typography variant="h1">
                            {program.program_name}
                        </Typography>

                        {userData.role === "superadmin" && (
                            <Button variant="contained">Edit</Button>
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
                        {/* Later load in these tags from the database!! */}
                        {program.tags && (
                            program.tags.map(tag => 
                                <Chip label={tag.tag_name}
                                sx={{ backgroundColor: tag.tag_color, color: "white" }} />
                            )
                        )}
                    </Stack>

                    <Typography
                        variant="h2"
                        sx={{ marginTop: "3rem", marginBottom: "2rem" }}
                    >
                        Upcoming events
                    </Typography>

                    <Box>
                        {/* <LongEventCard title={"Upcoming Event name"} />
                <LongEventCard title={"Upcoming Event name"} />
                <LongEventCard title={"Upcoming Event name"} />
                <LongEventCard title={"Upcoming Event name"} />
                <LongEventCard title={"Upcoming Event name"} /> */}
                    </Box>
                </div>
            )}
        </div>
    );
};

export default ProgramHomePage;
