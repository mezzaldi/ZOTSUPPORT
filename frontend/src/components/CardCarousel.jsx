import React from "react";
import ProgramCard from "./ProgramCard";
import EventCard from "./EventCard";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import axios from "axios";

// Determines the type of cards that will be displayed in the carousel.
// Will then reference the appropriate json data file to load in the user's
// followed programs, currently popular events, current upcoming events,
// and currently popular programs.

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

    console.log("DATA ", props.data);

    const getRequests = [];
    const cards = [];
    let data = null;

    if (props.cardType === "program") {
        data = props.data.map((item) => item.program_id);

        // id could be a program id or an event id
        data.forEach((id) => {
            const req = axios
                .get(`http://localhost:3001/programs/:${id}`)
                .catch((err) => console.log(err));

            getRequests.push(req);
        });
    }

    if (props.cardType === "event") {
        data = props.data;
    }

    if (props.cardType === "program") {
        Promise.all(getRequests).then((responses) => {
            responses.forEach((res) => {
                const programDetails = res.data;
                cards.push(
                    // key prop is needed for the carousel component to work, ignore
                    <ProgramCard
                        key={programDetails.program_name}
                        title={programDetails.program_name}
                    />
                );
            });
        });
    }

    if (props.cardType === "event") {
        data.map((item) => {
            cards.push(
                // key prop is needed for the carousel component to work, ignore
                <EventCard key={item.event_name} title={item.event_name} />
            );
        });
    }

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
