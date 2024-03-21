import React from "react";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const EventCard = (props) => {
    const navigate = useNavigate();

    return (
        <Card
            sx={{ width: "17rem" }}
            onClick={() => navigate(`/EventHomePage/:${props.event_id}`)}
        >
            {/* The program header image */}
            <CardMedia
                sx={{ height: 140 }}
                image="/images/placeholder.jpg"
                title="program header image"
            />

            <CardContent sx={{ height: "2rem" }}>
                <div className="cardText">
                    <Typography
                        variant="body1"
                        style={{
                            display: "inline-block",
                            whiteSpace: "pre-line",
                        }}
                    >
                        {props.title}
                    </Typography>
                </div>
            </CardContent>

        </Card>
    );
};

export default EventCard;
