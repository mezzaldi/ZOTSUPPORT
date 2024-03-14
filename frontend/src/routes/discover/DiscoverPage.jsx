import React from "react";
import Typography from "@mui/material/Typography";

import CardCarousel from "../../components/CardCarousel";

import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Grid from "@mui/material/Grid";

const DiscoverPage = () => {
    // Get upcoming events
    const [upcomingEvents, setUpcomingEvents] = useState();
    useEffect(() => {
        console.log("useeffect upcoming events");
        const getUpcomingEvents = async () => {
            const res = await axios
                .get(`http://localhost:3001/upcoming-events`)
                .catch((err) => console.log(err));
            setUpcomingEvents(res.data);
        };
        getUpcomingEvents();
    }, []);

    // Get popular events
    const [popularEvents, setPopularEvents] = useState();
    useEffect(() => {
        console.log("useeffect popular events");
        const getPopularEvents = async () => {
            const res = await axios
                .get(`http://localhost:3001/popular-upcoming-events`)
                .catch((err) => console.log(err));
            setPopularEvents(res.data);
        };
        getPopularEvents();
    }, []);

    // Get popular programs
    const [popularPrograms, setPopularPrograms] = useState();
    useEffect(() => {
        console.log("useeffect popular programs");
        const getPopularPrograms = async () => {
            const res = await axios
                .get(`http://localhost:3001/popular-programs`)
                .catch((err) => console.log(err));
            setPopularPrograms(res.data);
        };
        getPopularPrograms();
    }, []);

    return (
        <div class="pageContent">
            <Typography variant="h1">Discover Events & Programs</Typography>

            <div className="h2Container">
                <Typography variant="h2">Upcoming events</Typography>
                {upcomingEvents && (
                    <CardCarousel cardType="event" data={upcomingEvents} />
                )}
            </div>
            {/* <CardCarousel cardType="event" /> */}
            <div className="h2Container">
                <Typography variant="h2">Popular events</Typography>
                {popularEvents && (
                    <CardCarousel cardType="event" data={popularEvents} />
                )}
            </div>
            {/* <CardCarousel cardType="event" /> */}
            <div className="h2Container">
                <Typography variant="h2">
                    Popular learning support programs
                </Typography>
                {popularPrograms && (
                    <CardCarousel cardType="program" data={popularPrograms} />
                )}
            </div>
            {/* <CardCarousel cardType="program" /> */}
        </div>
    );
};

export default DiscoverPage;
