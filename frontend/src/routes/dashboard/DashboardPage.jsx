import React from "react";
import { useContext, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

import NotificationTable from "../../components/NotificationTable";
import CardCarousel from "../../components/CardCarousel";
import EventBar from "../../components/EventBar";
import AdminTable from "../../components/AdminTable";

import UserContext from "../../user/UserContext";
import axios from "axios";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

// Used to style pop-up modals
const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    borderRadius: 1,
    //   border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
};

// async makes a function return a promise
// await makes a function wait for a promise
async function AddAdminToDatabase(adminEmail) {
    try {
        await axios.post(`http://localhost:3001/admins/add/:${adminEmail}`);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

// pop-up for when superadmin clicks 'add admin'
function AddAdminModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpenAddAdmin = () => setOpen(true);
    const handleCloseAddAdmin = () => setOpen(false);

    const [email, setEmail] = useState("");

    // SNACKBAR
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const handleSnackbarOpen = () => {
        setSnackbarOpen(true);
    };
    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <React.Fragment>
            <Button onClick={handleOpenAddAdmin} variant="outlined">
                Add admins
            </Button>

            {/* Pop-up modal to add an admin */}
            <Modal
                open={open}
                onClose={handleCloseAddAdmin}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    {/* Header */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography id="modal-modal-title" variant="h2">
                            Add administrator to program
                        </Typography>
                        <Button
                            onClick={handleCloseAddAdmin}
                            variant="text"
                            endIcon={<CloseIcon />}
                        >
                            Nevermind
                        </Button>
                    </Box>
                    <Typography id="modal-modal-description" variant="body1">
                        Enter a UC Irvine email address (ends in “@uci.edu”) to
                        add a new administrator to this learning support
                        program:
                    </Typography>
                    <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        value={email ?? ""}
                        onChange={(input) => {
                            setEmail(input.target.value);
                        }}
                        error={email !== "" && !email.includes("@uci.edu")}
                        helperText={
                            email !== "" && !email.includes("@uci.edu")
                                ? "Please enter a valid UCI email address in order to add them as an administrator."
                                : ""
                        }
                        sx={{ width: "100%" }}
                    />
                    {/* Button should close modal and give confirmation toast if email is valid,
                    else give error */}
                    <Button
                        onClick={() => {
                            // using .then because addadmin to database is an async function
                            AddAdminToDatabase(email).then((success) => {
                                if (success) {
                                    // pop up the success snackbar and close the modal
                                    handleSnackbarOpen();
                                    handleCloseAddAdmin();
                                } else {
                                    console.log("aw");
                                }
                            });
                        }}
                        variant="contained"
                        sx={{ width: "25%" }}
                    >
                        Add new admin
                    </Button>
                </Box>
            </Modal>

            {/* Confirmation snack bar for when admin has been successfully added */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    Admin successfully added
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}

async function RemoveAdminFromDatabase(adminEmail) {
    try {
        await axios.delete(
            `http://localhost:3001/admins/remove/:${adminEmail}`
        );
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

// pop-up for when superadmin clicks 'remove admin'
function RemoveAdminModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpenRemoveAdmin = () => setOpen(true);
    const handleCloseRemoveAdmin = () => setOpen(false);

    const [email, setEmail] = useState("");

    // SNACKBAR
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const handleSnackbarOpen = () => {
        setSnackbarOpen(true);
    };
    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <React.Fragment>
            <Button
                onClick={handleOpenRemoveAdmin}
                variant="text"
                color="error"
            >
                Remove admins
            </Button>

            {/* Pop-up modal to remove an admin */}
            <Modal
                open={open}
                onClose={handleCloseRemoveAdmin}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    {/* Header */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography id="modal-modal-title" variant="h2">
                            Remove administrator from program
                        </Typography>
                        <Button
                            onClick={handleCloseRemoveAdmin}
                            variant="text"
                            endIcon={<CloseIcon />}
                        >
                            Nevermind
                        </Button>
                    </Box>
                    <Typography id="modal-modal-description" variant="body1">
                        Select an administrator to revoke their administrator
                        permissions from this learning support program:
                    </Typography>
                    <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        value={email ?? ""}
                        onChange={(input) => {
                            setEmail(input.target.value);
                        }}
                        sx={{ width: "100%" }}
                        error={email !== "" && !email.includes("@uci.edu")}
                        helperText={
                            email !== "" && !email.includes("@uci.edu")
                                ? "Please enter a valid UCI email address in order to add them as an administrator."
                                : ""
                        }
                    />
                    {/* Button should close modal and give confirmation toast if email is valid,
                    else give error */}
                    <Button
                        onClick={() => {
                            // using .then because addadmin to database is an async function
                            RemoveAdminFromDatabase(email).then((success) => {
                                if (success) {
                                    // pop up the success snackbar and close the modal
                                    handleSnackbarOpen();
                                    handleCloseRemoveAdmin();
                                } else {
                                    console.log("aw");
                                }
                            });
                        }}
                        variant="contained"
                        color="error"
                        sx={{ width: "25%" }}
                    >
                        Remove admin
                    </Button>
                </Box>
            </Modal>
            {/* Confirmation snack bar for when admin has been successfully added */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    Admin successfully removed
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}

const DashboardPage = () => {
    const userData = useContext(UserContext);

    // Get the user's followed programs.
    const [followedPrograms, setFollowedPrograms] = useState();
    useEffect(() => {
        const getFollowedPrograms = async () => {
            const res = await axios
                .get(
                    `http://localhost:3001/followedPrograms/:${userData.ucinetid}`
                )
                .catch((err) => console.log(err));
            setFollowedPrograms(res.data);
        };
        getFollowedPrograms();
    }, [userData]);

    return (
        <div className="pageContent">
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
                    {userData.name}'s Dashboard
                </Typography>

                <div>
                    <Link to="/ProgramEvents">
                        <Button variant="outlined" sx={{ marginRight: "10px" }}>
                            Program events
                        </Button>
                    </Link>
                    <Link to="/ProgramHome">
                        <Button variant="outlined">Program home</Button>
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
                        <EventBar />
                        <EventBar />
                        <EventBar />
                        <EventBar />
                        <EventBar />
                    </div>
                </div>

                {/* calendar widget */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar />
                </LocalizationProvider>
            </div>

            <div>
                <div className="h2Container">
                    <Typography variant="h2">Notifications</Typography>
                </div>
                <div className="tableContainer">
                    <NotificationTable rowsPerPage={4} />
                </div>
            </div>

            {/* Program admin table only shownt to admin or superadmin */}
            {(userData.role === "admin" || userData.role === "superadmin") && (
                <div>
                    <div className="h2Container">
                        <Typography variant="h2">
                            Program administrators
                        </Typography>
                    </div>
                    <div className="tableContainer">
                        <AdminTable rowsPerPage={5} />
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

            {/* Make sure followedPrograms is loaded in */}
            {followedPrograms && (
                <div>
                    <div className="h2Container">
                        <Typography variant="h2">Followed programs</Typography>
                    </div>
                    <CardCarousel
                        cardType="program"
                        data={followedPrograms.map((item) => item.program_id)}
                    />
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
