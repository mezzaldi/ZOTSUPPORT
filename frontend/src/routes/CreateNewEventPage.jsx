import React from 'react';
import Event from '../CreateEvent';
import { Typography } from '@mui/material';

const CreateNewEventPage = () => {
  return (
    <div className='pageContent'>
        <div className='h1Container'>
            <Typography variant="h1">
                Create a New Program
            </Typography>
        </div>      
        <Event/>
    </div>
  );
};

export default CreateNewEventPage;