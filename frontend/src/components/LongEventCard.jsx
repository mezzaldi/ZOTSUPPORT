import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

//function makeDate(dateString) {
//    const date = new Date(dateString);
//   return date;
//}

const LongEventCard = (props) => {
    const data = props.data;

    let date = new Date(data.date).toLocaleDateString("en-US");

    function formatAdmins(adminList) {
        let result = "";
        adminList.forEach((admin, index) => {
            if (index !== adminList.length - 1) {
                result += admin + ", ";
            } else {
                result += admin;
            }
        });
        return result;
    }

    function formatTags(tags) {
        let chips = [];
        tags.forEach((tag) => {
            if (tag !== ":") {
                tag = tag.split(":");
                chips.push(
                    <Chip
                        label={tag[0]}
                        sx={{ backgroundColor: tag[1], color: "white" }}
                    />
                );
            }
        });
        return chips;
    }

    return (
        <div>
            <Card
                sx={{
                    width: "100%",
                    borderTop: "2rem solid green",
                    marginBottom: "1.5rem",
                }}
            >
                <CardContent>
                    <div className="cardText">
                        <Typography variant="subtitle1" sx={{ color: "blue" }}>
                            {date}
                        </Typography>
                        <Typography variant="h2" sx={{ marginBottom: "5px" }}>
                            {data.event_name}
                        </Typography>
                        <Typography variant="subtitle1">
                            Hosted by {formatAdmins(data.admins)}
                        </Typography>
                    </div>

                    <Stack direction="row" spacing={1}>
                        {/* Later load in these tags from the database!! */}
                        {formatTags(data.tags)}
                    </Stack>
                </CardContent>
            </Card>
        </div>
    );
};

export default LongEventCard;
