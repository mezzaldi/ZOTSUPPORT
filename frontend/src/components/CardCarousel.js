import React from 'react';
import FollowedProgramsData from '../data/FollowedProgramsData';
import ProgramCard from './ProgramCard';
import CarouselPaginator from './CarouselPaginator';


function determineCardType(cardType) {
    if (cardType === 'followedPrograms'){
        return FollowedProgramsData.map((value) => (
            <ProgramCard programName={value.programName} />
        ));
    }
}


// https://www.npmjs.com/package/react-multi-carousel
// ^^^^^^ USE THIS REACT MULTI CAROUSEL INSTEAD!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


// props will contain a string representing what kind of card the carousel should contain
const CardCarousel = (props) => {

    const cards = determineCardType(props.cardType);

    return (
        <div >
            <div className='cardContainer'>
                {cards}
           </div>
           <CarouselPaginator/>
        </div>
      );
    };
    
export default CardCarousel;