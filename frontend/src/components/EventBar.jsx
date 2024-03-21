import React from "react";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";


const EventBar = (props) => {
    const data = props.data;
    const navigate = useNavigate();


    let date = new Date(data.date).toLocaleDateString("en-US");

    return (
        <div className="upcomingEventBar" onClick={() => navigate(`/EventHomePage/:${props.event_id}`)}>
            <div>
                <Typography variant="body1">{data.event_name}</Typography>
                <Typography variant="subtitle1">
                    By learning {data.program_name}
                </Typography>
            </div>
            <div className="dateChip">
                <Typography variant="body1" style={{ color: "white" }}>
                    {date}
                </Typography>
            </div>
        </div>
    );
};

export default EventBar;
