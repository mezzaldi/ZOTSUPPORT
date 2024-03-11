import React from "react";
import Notification from "../../CreateNotification";
import { Typography } from "@mui/material";

const CreateNewNotificationPage = () => {
    return (
        <div className="pageContent">
            <div className="h1Container">
                <Typography variant="h1">
                    Create a New Custom Notification for Program
                </Typography>
            </div>
            <Notification />
        </div>
    );
};

export default CreateNewNotificationPage;
