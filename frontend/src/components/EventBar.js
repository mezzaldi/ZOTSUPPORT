import React from 'react';
import Typography from '@mui/material/Typography';

const EventBar = (props) => {
  return (
    <div className='upcomingEventBar'>
    <div>
        <Typography variant="body1">
            Upcoming event name
        </Typography>
        <Typography variant="subtitle1">
            By learning program name
        </Typography>
    </div>
    <div className='dateChip'>
        <Typography variant="body1" style={{color:'white'}}>
            mm/dd/yy
        </Typography>
    </div>
	</div>
	);
};

export default EventBar;