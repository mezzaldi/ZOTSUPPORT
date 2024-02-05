import React from 'react';
import Typography from '@mui/material/Typography';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import NotificationTable from '../../components/NotificationTable';
import CardCarousel from '../../components/CardCarousel';
import EventBar from '../../components/EventBar';


const AdminDashboardPage = () => {
  return (
    <div className='pageContent'>
        <div className='h1Container'>
            <Typography variant="h1">
            Admin name's Dashboard
            </Typography>
        </div>

        <div className="eventBarsAndCalendar">
            <div>
                <div className='h2Container'>
                    <Typography variant="h2">
                    Your upcoming events
                    </Typography>
                </div>
                <div>
                    <EventBar/>
                    <EventBar/>
                    <EventBar/>
                    <EventBar/>
                    <EventBar/>
                </div>
            </div>

            {/* calendar widget */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar />
            </LocalizationProvider>
        </div>


        <div className='h2Container'>
            <Typography variant="h2">
            Notifications
            </Typography>
        </div>

        <div className="tableContainer">
            <NotificationTable rowsPerPage={4}/>
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