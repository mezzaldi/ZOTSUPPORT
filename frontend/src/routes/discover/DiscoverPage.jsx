import React from "react";
import Typography from "@mui/material/Typography";

import CardCarousel from "../../components/CardCarousel";

import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const DiscoverPage = () => {
    // Get upcoming events
    const [upcomingEvents, setUpcomingEvents] = useState();
    useEffect(() => {
        const getUpcomingEvents = async () => {
            const res = await axios
                .get(`http://localhost:3001/upcoming-events`)
                .catch((err) => console.log(err));
            setUpcomingEvents(res.data);
        };
        getUpcomingEvents();
    });

    return (
        <div class="pageContent">
            <div className="h2Container">
                <Typography variant="h2">Upcoming events</Typography>
                {upcomingEvents && (
                    <CardCarousel cardType="event" data={upcomingEvents} />
                )}
            </div>

            {/* <CardCarousel cardType="event" /> */}

            <div className="h2Container">
                <Typography variant="h2">Popular events</Typography>
            </div>

            {/* <CardCarousel cardType="event" /> */}

            <div className="h2Container">
                <Typography variant="h2">
                    Popular learning support programs
                </Typography>
            </div>

            {/* <CardCarousel cardType="program" /> */}
        </div>
    );
};

export default DiscoverPage;
