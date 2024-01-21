import React from 'react';
import ProgramCard from '../components/ProgramCard';
import Typography from '@mui/material/Typography';

const StudentDashboardPage = () => {
  return (
    <div className='pageContent'>
        <div className='h1Container'>
            <Typography variant="h1">
            Student name's Dashboard
            </Typography>
        </div>

        <div className='h2Container'>
            <Typography variant="h2">
            Your upcoming events:
            </Typography>
        </div>

        <div className='h2Container'>
            <Typography variant="h2">
            Followed programs:
            </Typography>
        </div>

        <div className='cardContainer'>
            <ProgramCard programName="Program name"/>
            <ProgramCard programName="Program name"/>
            <ProgramCard programName="Program name"/>
            <ProgramCard programName="Program name"/>
        </div>
        
    </div>
  );
};

export default StudentDashboardPage;