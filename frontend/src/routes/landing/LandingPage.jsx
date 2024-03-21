import React from 'react';
import './LandingPage.css';
import '../../styles.scss'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNetworkWired, faBell, faComments } from '@fortawesome/free-solid-svg-icons';
import { Typography, Button, Grid, Box, Container } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import Logo from '../Logo.png';
import HeaderImg from '../Header.jpeg'; // Ensure this import path is correct
import Student from '../students.jpg';

function LandingPage() {
  return (
    <div>
      <Box className="header" sx={{ backgroundImage: `url(${HeaderImg})`, color: '#fff', textAlign: 'center', padding: '60px 20px' }}>
        <Box className="welcome-text-container">
          <Typography variant="h1" className="welcome-title" gutterBottom>
            Welcome to ZOTSUPPORT!
          </Typography>
          <Typography variant="body1" className="welcome-subtitle">
            Your one-step hub for learning support program at UCI.
          </Typography>
        </Box>
        <div className="sign-in-box">
          <Typography variant="body1" className="sign-in-text">Make the most of your academic resources.</Typography>
          <Button variant="contained" color="primary" endIcon={<LoginIcon />}>
            Sign in
          </Button>
        </div>
      </Box>
      <Container maxWidth={false}>
        <Box my={4}>
          <Typography variant="h1" className="h1Container" gutterBottom>What is ZOTSUPPORT?</Typography>
          <Typography variant="body1" className="bodyText" gutterBottom>ZOTSUPPORT is made for UC Irvine students, by UC Irvine students. We aim to:</Typography>
          <Box my={4} textAlign="center" className="info-bullets">
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={4}>
                <Box className="icon-circle"><FontAwesomeIcon icon={faNetworkWired} size="2x" /></Box>
                <Typography variant="body1" className="bodyText">Provide a centralized place for<br></br>
                  students to discover learning <br></br>
                  support programs and their services</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box className="icon-circle"><FontAwesomeIcon icon={faBell} size="2x" /></Box>
                <Typography variant="body1" className="bodyText">Remind students to attend <br></br>
                  learning support events they have <br></br>
                  registered for</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box className="icon-circle"><FontAwesomeIcon icon={faComments} size="2x" /></Box>
                <Typography variant="body1" className="bodyText">Ease communication between <br></br>
                  learning support programs and <br></br>
                  students</Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <hr className="section-divider" />
        <Box my={4}>
          <Typography variant="h1" className="h1Container" gutterBottom>Who can use ZOTSUPPORT?</Typography>
          <Typography variant="body1" className="bodyText" gutterBottom>ZOTSUPPORT is available to anyone with an active UC Net ID.</Typography>
          <Box className="student-image-box">
            <img src={Student} alt="UCI LARC students" />
          </Box>
        </Box>
        <hr className="section-divider" />
        <Box my={4}>
          <Typography variant="h1" className="h1Container" gutterBottom>Our Sponsor For ZOTSUPPORT: UCI LARC</Typography>
          <Box my={2}>
            <div>
              <Box className="logo-image-box">
                <img src={Logo} alt="UCI LARC" />
              </Box>
            </div>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default LandingPage;
