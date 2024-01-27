import React from 'react';
import Typography from '@mui/material/Typography';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import NotificationTable from '../components/NotificationTable';
import CardCarousel from '../components/CardCarousel';


const AdminDashboardPage = () => {
  return (
    <div className='pageContent'>
        <div className='h1Container'>
            <Typography variant="h1">
            Admin name's Dashboard
            </Typography>
        </div>

        <div className='h2Container'>
            <Typography variant="h2">
            Followed programs
            </Typography>
        </div>

        <CardCarousel cardType='followedPrograms'/>
        
    </div>
  );
};

export default AdminDashboardPage;