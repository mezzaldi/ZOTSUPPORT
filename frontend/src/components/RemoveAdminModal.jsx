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
const RemoveAdminModal = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpenRemoveAdmin = () => setOpen(true);
    const handleCloseRemoveAdmin = () => setOpen(false);

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
                        error={emailInvalid}
                        helperText={
                            emailInvalid
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
                                    setEmailInvalid(true);
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
};

export default RemoveAdminModal;
