import React from "react";
import { useContext, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

import EventBar from "../../components/EventBar";
import AdminTable from "../../components/AdminTable";
import SendIcon from "@mui/icons-material/Send";

import UserContext from "../../user/UserContext";
import axios from "axios";
import { useState } from "react";
import AddAdminModal from "../../components/AddAdminModal";
import RemoveAdminModal from "../../components/RemoveAdminModal";
import { useParams } from "react-router-dom";

const ProgramDashboardPage = () => {
    let { program_id } = useParams();
    program_id = program_id.replace(":", "");
    const userData = useContext(UserContext);

    const [program, setProgram] = useState();
    useEffect(() => {
        const getProgram = async () => {
            const res = await axios
                .get(`http://localhost:3001/programs/:${program_id}`)
                .catch((err) => console.log(err));
            setProgram(res.data);
            console.log("PROGRAM: ", res.data);
        };
        getProgram();
    }, [program_id]);

    // Get the program's administrators
    const [admins, setAdmins] = useState();
    useEffect(() => {
        const getAdmins = async () => {
            const res = await axios
                .get(
                    `http://localhost:3001/programs/:${userData.program_id}/administrators`
                )
                .catch((err) => console.log(err));
            setAdmins(res.data);
        };
        getAdmins();
    }, [userData]);

    // Get the programs's upcoming events
    const [upcomingEvents, setUpcomingEvents] = useState();
    useEffect(() => {
        const getUpcomingEvents = async () => {
            if (!program) {
                return;
            }
            const res = await axios
                .get(
                    `http://localhost:3001/programs/${program.programId}/events/upcoming`
                )
                .catch((err) => console.log(err));
            setUpcomingEvents(res.data);
        };
        getUpcomingEvents();
    }, [program]);

    return (
        <div className="pageContent">
            {program && (
                <div>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            paddingTop: "1rem",
                            paddingBottom: "1rem",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography variant="h1">
                            {program.name} Dashboard
                        </Typography>

                        <div>
                            <Link to={`/ProgramEvents/:${program_id}`}>
                                <Button
                                    variant="outlined"
                                    sx={{ marginRight: "10px" }}
                                >
                                    Program events
                                </Button>
                            </Link>
                            <Link to={`/ProgramHomePage/:${program_id}`}>
                                <Button
                                    variant="outlined"
                                    sx={{ marginRight: "10px" }}
                                >
                                    Program home
                                </Button>
                            </Link>

                            <Link to="/CreateNewNotification">
                                <Button
                                    href="/CreateNewNotification"
                                    startIcon={<SendIcon />}
                                    variant="outlined"
                                    sx={{ marginRight: "10px" }}
                                >
                                    Send new notification
                                </Button>
                            </Link>
                        </div>
                    </Box>

                    <div className="eventBarsAndCalendar">
                        <div>
                            <div className="h2Container">
                                <Typography variant="h2">
                                    Your upcoming events
                                </Typography>
                            </div>
                            <div>
                                {upcomingEvents &&
                                    upcomingEvents.map((eventData) => {
                                        return <EventBar data={eventData} />;
                                    })}
                            </div>
                        </div>

                        {/* calendar widget */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar />
                        </LocalizationProvider>
                    </div>

                    {/* Program admin table only shownt to admin or superadmin */}
                    {(userData.role === "admin" ||
                        userData.role === "superadmin") && (
                        <div>
                            <div className="h2Container">
                                <Typography variant="h2">
                                    Program administrators
                                </Typography>
                            </div>
                            <div className="tableContainer">
                                {admins && (
                                    <AdminTable rowsPerPage={5} data={admins} />
                                )}
                            </div>
                        </div>
                    )}

                    {/* Buttons to change admins only shown to superadmin */}
                    {userData.role === "superadmin" && (
                        <div>
                            <AddAdminModal />
                            <RemoveAdminModal />
                        </div>
                    )}

                    <div></div>
                </div>
            )}
        </div>
    );
};

export default ProgramDashboardPage;
