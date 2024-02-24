import React from 'react';
import ProgramCard from './ProgramCard';
import EventCard from './EventCard';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

// Data file imports
import FollowedProgramsData from '../data/FollowedProgramsData';
import PopularEventsData from '../data/PopularEventsData';
import PopularProgramsData from '../data/PopularProgramsData';
import UpcomingEventsData from '../data/UpcomingEventsData';

// Determines the type of cards that will be displayed in the carousel.
// Will then reference the appropriate json data file to load in the user's
// followed programs, currently popular events, current upcoming events,
// and currently popular programs. 
function determineCardType(cardType) {

    // PROGRAM CARDS
    if (cardType === 'followedPrograms'){
        return FollowedProgramsData.map((value) => (
            <ProgramCard title={value.title} />
        ));
    }
    if (cardType === 'popularPrograms'){
        return PopularProgramsData.map((value) => (
            <ProgramCard title={value.title} />
        ));
    }
    if (cardType === 'Programs'){
        return PopularProgramsData.map((value) => (
            <ProgramCard title={value.title} />
        ));
    }

    // EVENT CARDS
    if (cardType === 'upcomingEvents'){
        return UpcomingEventsData.map((value) => (
            <EventCard title={value.title} />
        ));
    }
    if (cardType === 'popularEvents'){
        return PopularEventsData.map((value) => (
            <EventCard title={value.title} />
        ));
    }
}

const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1500 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 1500, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
};
  

// Carousel component:
// https://www.npmjs.com/package/react-multi-carousel

// props will contain a string representing what kind of card the carousel should contain
const CardCarousel = (props) => {

    const cards = determineCardType(props.cardType);

    return (
        <div >

        {/* item class creates custom scss class */}
        <Carousel responsive={responsive} showDots={true} removeArrowOnDeviceType={["tablet", "mobile"]} className="card-carousel">
            {cards}
        </Carousel>

        </div>
      );
    };
    
export default CardCarousel;