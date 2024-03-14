import React from "react";
import Notification from "../../CreateNotification";
import { Typography } from "@mui/material";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

const CreateNewNotificationPage = () => {
    let { program_id } = useParams();
    console.log(program_id)
    program_id = program_id.replace(":", "");
    

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
