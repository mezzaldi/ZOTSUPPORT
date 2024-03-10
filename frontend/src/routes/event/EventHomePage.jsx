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

const EventHomePage = () => {
    let { event_id } = useParams();
    event_id = event_id.replace(":", "");

    const userData = useContext(UserContext);

    const [event, setEvent] = useState();
    useEffect(() => {
        const getEvent = async () => {
            const res = await axios
                .get(`http://localhost:3001/events/:${event_id}`)
                .catch((err) => console.log(err));
            setEvent(res.data);
            console.log(res.data);
        };
        getEvent();
    }, [userData]);

    return (

        <Typography> Testing </Typography>


    );
};

export default EventHomePage;

