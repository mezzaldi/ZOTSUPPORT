import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const LongEventCard = (props) => {
    return (
        <div>
            <Card
                sx={{
                    width: "100%",
                    borderTop: "2rem solid green",
                    marginBottom: "1.5rem",
                }}
            >
                {/* The program header image */}

                <CardContent>
                    <div className="cardText">
                        <Typography variant="subtitle1" sx={{ color: "blue" }}>
                            Date
                        </Typography>
                        <Typography variant="h2" sx={{ marginBottom: "5px" }}>
                            {props.title}
                        </Typography>
                        <Typography variant="subtitle1">
                            Hosted by AdminName, AdminName, AdminName
                        </Typography>
                    </div>

                    <Stack direction="row" spacing={1}>
                        {/* Later load in these tags from the database!! */}
                        <Chip
                            label="tag"
                            sx={{ backgroundColor: "green", color: "white" }}
                        />
                        <Chip
                            label="tag"
                            sx={{ backgroundColor: "green", color: "white" }}
                        />{" "}
                        <Chip
                            label="tag"
                            sx={{ backgroundColor: "green", color: "white" }}
                        />{" "}
                        <Chip
                            label="tag"
                            sx={{ backgroundColor: "green", color: "white" }}
                        />
                    </Stack>
                </CardContent>
            </Card>
        </div>
    );
};

export default LongEventCard;
