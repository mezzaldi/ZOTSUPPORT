import React from "react";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
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
const AddAdminModal = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpenAddAdmin = () => setOpen(true);
    const handleCloseAddAdmin = () => setOpen(false);

    const [email, setEmail] = useState("");
    const [emailInvalid, setEmailInvalid] = useState(false);

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
                        program. The user with this email address must already
                        be registered for Zot Support.
                    </Typography>
                    <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        value={email ?? ""}
                        onChange={(input) => {
                            setEmail(input.target.value);
                            if (email !== "" && !email.includes("@uci.edu")) {
                                setEmailInvalid(false);
                            }
                        }}
                        error={emailInvalid}
                        helperText={
                            emailInvalid
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
                                    setEmailInvalid(true);
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
};

export default AddAdminModal;
