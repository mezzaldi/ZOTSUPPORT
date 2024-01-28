import React from 'react';
import Typography from '@mui/material/Typography';
import CardCarousel from '../../components/CardCarousel';

const DiscoverPage = () => {
  return (
    <div class='pageContent'>

        <div className='h2Container'>
            <Typography variant="h2">
            Upcoming events
            </Typography>
        </div>

        <CardCarousel cardType='upcomingEvents'/>

		<div className='h2Container'>
            <Typography variant="h2">
            Popular events
            </Typography>
        </div>

		<CardCarousel cardType='popularEvents'/>

		<div className='h2Container'>
            <Typography variant="h2">
            Popular learning support programs
            </Typography>
        </div>

		<CardCarousel cardType='popularPrograms'/>

    </div>
  );
};

export default DiscoverPage;