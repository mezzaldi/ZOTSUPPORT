import React from "react";
import ProgramCard from "./ProgramCard";
import EventCard from "./EventCard";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

// Data file imports
import FollowedProgramsData from "../data/FollowedProgramsData";
import PopularEventsData from "../data/PopularEventsData";
import PopularProgramsData from "../data/PopularProgramsData";
import UpcomingEventsData from "../data/UpcomingEventsData";

// Determines the type of cards that will be displayed in the carousel.
// Will then reference the appropriate json data file to load in the user's
// followed programs, currently popular events, current upcoming events,
// and currently popular programs.

function determineCardType(cardType, data) {
    // PROGRAM CARDS
    if (cardType === "program") {
        return FollowedProgramsData.map((value) => (
            // key prop is needed for the carousel component to work, ignore
            <ProgramCard key={value.title} title={value.title} />
        ));
    }

    // EVENT CARDS
    if (cardType === "event") {
        return UpcomingEventsData.map((value) => (
            <EventCard key={value.title} title={value.title} />
        ));
    }
}

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1500 },
        items: 5,
    },
    desktop: {
        breakpoint: { max: 1500, min: 1024 },
        items: 4,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2,
    },
};

// Carousel component:
// https://www.npmjs.com/package/react-multi-carousel

// props will contain a string representing what kind of card the carousel should contain
const CardCarousel = (props) => {
    //props.data contains a list of program IDs
    // Get the program data associated with those IDs.

    const getRequests = [];
    const cards = [];

    // id could be a program id or an event id
    props.data.forEach((id) => {
        const req = axios
            .get(`http://localhost:3001/programs/:${id}`)
            .catch((err) => console.log(err));

        getRequests.push(req);
    });

    Promise.all(getRequests).then((responses) => {
        responses.forEach((res) => {
            // ASSUMING ITS A PROGRAM CARD FOR NOW
            const programDetails = res.data[0];
            console.log("program details", programDetails);
            cards.push(
                // key prop is needed for the carousel component to work, ignore
                <ProgramCard
                    key={programDetails.program_name}
                    title={programDetails.program_name}
                />
            );

            console.log("CARDS: ", cards);
        });
    });

    // const cards = determineCardType(props.cardType, props.data);

    return (
        <div>
            {/* item class creates custom scss class */}
            <Carousel
                responsive={responsive}
                showDots={true}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                className="card-carousel"
            >
                {cards}
            </Carousel>
        </div>
    );
};

export default CardCarousel;
