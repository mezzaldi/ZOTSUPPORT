import React, { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, Button, Chip, Stack } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import UserContext from "../../user/UserContext";

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
    }, [program_id]);

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
                            {program.program_name}
                        </Typography>
                        {userData.role === "superadmin" && (
                            <Box>
                                <Link to={`/EditProgramForm/${program_id}`}>
                                     <Button variant="contained">Edit</Button>
                             </Link>
                            </Box>
                        )}
                    </Box>
                    <Typography variant="body1">
                        {program.description}
                    </Typography>
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
