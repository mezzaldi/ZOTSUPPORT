import React from 'react';
import Typography from '@mui/material/Typography';
import ProgramCard from '../components/ProgramCard';
import EventCard from '../components/EventCard';

const DiscoverPage = () => {
  return (
    <div class='pageContent'>

        <div className='h2Container'>
            <Typography variant="h2">
            Upcoming events
            </Typography>
        </div>

		<div className='cardContainer'>
            <EventCard eventName="Event nameeeeeeeeeee"/>
            <EventCard eventName="Event name"/>
			<EventCard eventName="Event name"/>
			<EventCard eventName="Event name"/>
			<EventCard eventName="Event name"/>
        </div>

		<div className='h2Container'>
            <Typography variant="h2">
            Popular events
            </Typography>
        </div>

		<div className='cardContainer'>
			<EventCard eventName="Event name"/>
			<EventCard eventName="Event name"/>
			<EventCard eventName="Event name"/>
			<EventCard eventName="Event name"/>
			<EventCard eventName="Event name"/>
        </div>

		<div className='h2Container'>
            <Typography variant="h2">
            Popular learning support programs
            </Typography>
        </div>

		<div className='cardContainer'>
            <ProgramCard programName="Program name"/>
            <ProgramCard programName="Program name"/>
            <ProgramCard programName="Program name"/>
            <ProgramCard programName="Program name"/>
			<ProgramCard programName="Program name"/>
        </div>

    </div>
  );
};

export default DiscoverPage;