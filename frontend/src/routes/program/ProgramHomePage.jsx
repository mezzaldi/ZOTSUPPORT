import React from "react";
import Typography from "@mui/material/Typography";
import LongEventCard from "../../components/LongEventCard";
import { Box } from "@mui/material";
import { useContext } from "react";

import { Button } from "@mui/material";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import UserContext from "../../user/UserContext";

const ProgramHomePage = () => {
    const userData = useContext(UserContext);

    return (
        <div class="pageContent">
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
                <Typography variant="h1">Program name</Typography>

                {userData.role === "superadmin" && (
                    <Button variant="contained">Edit</Button>
                )}
            </Box>

            <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.Akjd
                Ut enim ad minim veniam, quis nostrud exercitatio Lorem ipsum
                dolor sit amet, consectetur adipiscing elit. NDJK Sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitatio Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. SejfdSd do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitatio Lorem ipsum dolor sit amet,
                consectetur adipiscindkjg elit. Sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitatio
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
                />{" "}
                <Chip
                    label="Biology"
                    sx={{ backgroundColor: "orange", color: "white" }}
                />{" "}
                <Chip
                    label="Walk-in"
                    sx={{ backgroundColor: "red", color: "white" }}
                />
            </Stack>

            <Typography
                variant="h2"
                sx={{ marginTop: "3rem", marginBottom: "2rem" }}
            >
                Upcoming events
            </Typography>

            <Box>
                <LongEventCard title={"Upcoming Event name"} />
                <LongEventCard title={"Upcoming Event name"} />
                <LongEventCard title={"Upcoming Event name"} />
                <LongEventCard title={"Upcoming Event name"} />
                <LongEventCard title={"Upcoming Event name"} />
            </Box>
        </div>
    );
};

export default ProgramHomePage;
