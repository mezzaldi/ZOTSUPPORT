import React from "react";
import Typography from "@mui/material/Typography";

const EventBar = (props) => {
    const data = props.data;

    let date = new Date(data.date).toLocaleDateString("en-US");

    return (
        <div className="upcomingEventBar">
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
