import React from "react";
import ProgramCard from "./ProgramCard";
import EventCard from "./EventCard";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// Determines the type of cards that will be displayed in the carousel.
// Will then reference the appropriate json data file to load in the user's
// followed programs, currently popular events, current upcoming events,
// and currently popular programs.

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1400 },
        items: 4,
    },
    desktop: {
        breakpoint: { max: 1400, min: 950 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 950, min: 660 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 660, min: 0 },
        items: 1,
    },
};

// Carousel component:
// https://www.npmjs.com/package/react-multi-carousel

// props will contain a string representing what kind of card the carousel should contain
const CardCarousel = (props) => {
    //props.data contains a list of program IDs
    // Get the program data associated with those IDs.

    const cards = [];
    let data = props.data;

    if (props.cardType === "program") {
        data.map((item) => {
            cards.push(
                // key prop is needed for the carousel component to work, ignore
                <ProgramCard
                    key={item.program_id}
                    title={item.program_name}
                    program_id={item.program_id}
                />
            );
            return cards;
        });
    }

    if (props.cardType === "event") {
        data.map((item) => {
            cards.push(
                // key prop is needed for the carousel component to work, ignore
                <EventCard
                    key={item.event_name}
                    title={item.event_name}
                    event_id={item.event_id}
                />
            );
            return cards;
        });
    }

    // const cards = determineCardType(props.cardType, props.data);

    return (
        <div>
            {/* item class creates custom scss class */}
            <Carousel
                responsive={responsive}
                showDots={true}
                infinite={true}
                // removeArrowOnDeviceType={["tablet", "mobile"]}
                className="card-carousel"
                itemClass="carousel-item"
            >
                {cards}
            </Carousel>
        </div>
    );
};

export default CardCarousel;
