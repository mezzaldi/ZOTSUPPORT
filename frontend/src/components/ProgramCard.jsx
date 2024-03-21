import React from "react";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const ProgramCard = (props) => {
    const navigate = useNavigate();

    return (
        <Card
            sx={{ width: "17rem", cursor: "pointer" }}
            onClick={() => {
                if (props.linkType === "dashboard") {
                    navigate(`/ProgramDashboardPage/:${props.program_id}`);
                } else {
                    navigate(`/ProgramHomePage/:${props.program_id}`);
                }
            }}
        >
            {/* The program header image */}
            <CardMedia
                sx={{ height: "9rem" }}
                image="/images/placeholder.jpg"
                title="program header image"
            />

            <CardContent className="cardText" sx={{ height: "2rem" }}>
                <div className="cardText">
                    <Typography variant="body1">{props.title}</Typography>
                </div>
            </CardContent>

        </Card>
    );
};

export default ProgramCard;
