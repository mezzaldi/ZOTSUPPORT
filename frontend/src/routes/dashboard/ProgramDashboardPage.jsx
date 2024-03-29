import React from "react";
import { useContext, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import EventBar from "../../components/EventBar";
import AdminTable from "../../components/AdminTable";
import SendIcon from "@mui/icons-material/Send";
import Grid from "@mui/material/Grid";
import UserContext from "../../user/UserContext";
import axios from "axios";
import { useState } from "react";
import AddAdminModal from "../../components/AddAdminModal";
import RemoveAdminModal from "../../components/RemoveAdminModal";
import { useParams } from "react-router-dom";


const ProgramDashboardPage = () => {
    let { program_id } = useParams();
    program_id = parseInt(program_id.replace(":", ""));
    const userData = useContext(UserContext);

    // Check if the user is a super administrator for this program
    const isSuperAdmin = userData.superadminprograms.includes(program_id)
        ? true
        : false;

    const [program, setProgram] = useState();
    useEffect(() => {
        const getProgram = async () => {
            const res = await axios
                .get(`http://localhost:3001/programs/:${program_id}`)
                .catch((err) => console.log(err));
            setProgram(res.data);
        };
        getProgram();
    }, [program_id]);

    // Get the program's administrators
    const [admins, setAdmins] = useState();
    useEffect(() => {
        const getAdmins = async () => {
            const res = await axios
                .get(
                    `http://localhost:3001/programs/:${program_id}/administrators`
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
                    `http://localhost:3001/programs/${program_id}/events/upcoming`
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
                    <div className="pageRow">
                        <Grid container spacing={0.5}>
                            {/* PROGRAM NAME */}
                            <Grid item md={12} lg={5}>
                                <Typography variant="h1">
                                    {program.name} Dashboard
                                </Typography>
                            </Grid>
                            {/* BUTTONS */}
                            <Grid
                                item
                                md={12}
                                lg={7}
                                sx={{
                                    display: "flex",
                                    flexDirection: {
                                        xs: "column",
                                        sm: "row",
                                    },
                                    flexWrap: "nowrap",
                                    overflowX: "auto",
                                }}
                            >
                                {/* inner container than contains the program home, events, and notifcation buttons */}

                                <Link to={`/ProgramHomePage/:${program_id}`}>
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            marginRight: "10px",
                                            marginBottom: {
                                                xs: "0.4rem",
                                                sm: "0rem",
                                            },
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        Program home
                                    </Button>
                                </Link>

                                <Link to={`/ProgramEvents/:${program_id}`}>
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            marginRight: "10px",
                                            marginBottom: {
                                                xs: "0.4rem",
                                                sm: "0rem",
                                            },
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        Program events
                                    </Button>
                                </Link>

                                <Link to={`/CreateNewNotification/:${program_id}`}>

                                    <Button
                                        startIcon={<SendIcon />}
                                        variant="outlined"
                                        sx={{
                                            marginRight: "10px",
                                            marginBottom: {
                                                xs: "0.4rem",
                                                sm: "0rem",
                                            },
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        Send new notification
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </div>

                    <div className="pageRow">
                        <Grid container spacing={1}>
                            {/* HEADER */}
                            <Grid item xs={12}>
                                <Typography variant="h2">
                                    Your upcoming events
                                </Typography>
                            </Grid>
                            {/* EVENT BARS */}
                            <Grid item xs={12} md={6}>
                                {upcomingEvents &&
                                    upcomingEvents.map((eventData) => {
                                        return <EventBar data={eventData} />;
                                    })}
                            </Grid>
                            {/* CALENDAR */}
                            <Grid item xs={12} md={6}>
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DateCalendar />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                    </div>

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

                    {/* Buttons to change admins only shown to superadmin */}
                    {isSuperAdmin && (
                        <div>
                            <AddAdminModal />
                            <RemoveAdminModal />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProgramDashboardPage;
