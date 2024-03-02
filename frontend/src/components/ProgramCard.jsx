import React from "react";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const ProgramCard = (props) => {
    return (
        <Card sx={{ marginRight: "1.5rem", width: "17rem" }}>
            {/* The program header image */}
            <CardMedia
                sx={{ height: 140 }}
                image="/images/placeholder.jpg"
                title="program header image"
            />

            <CardContent className="cardText">
                <div className="cardText">
                    <Typography variant="h3">{props.title}</Typography>
                </div>
            </CardContent>

            <CardActions>
                <Button size="small" variant="outlined" color="primary">
                    Unfollow
                </Button>
            </CardActions>
        </Card>
    );
};

export default ProgramCard;
