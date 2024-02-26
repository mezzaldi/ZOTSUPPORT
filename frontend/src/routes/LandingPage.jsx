import React from 'react';
import './LandingPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNetworkWired, faBell, faComments } from '@fortawesome/free-solid-svg-icons';
import { Typography, Button, Grid, Box, Container } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';




function LandingPage() {
  return (
    <div>
      <Box className="header" sx={{ backgroundImage: 'url(https://orangeultimate.com/wp-content/uploads/2022/12/alyson-yin-_I0z8MWUeVA-unsplash.jpg)', color: '#fff', textAlign: 'center', padding: '60px 20px' }}>
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
            <palette variant="primary"><Button variant="contained" color="primary" endIcon={<LoginIcon />}>
              Sign in
            </Button></palette>
        </div>
      </Box>
      <div>
        <br></br>
      </div>
      <Container maxWidth={false}>
        <Box my={4}>
          <Typography variant="h1" gutterBottom>What is ZOTSUPPORT</Typography>
          <Typography variant="body1" gutterBottom>Zot Support is made for UC Irvine students, by UC Irvine students. We aim to:</Typography>
          <Box my={4} textAlign="center">
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={4}>
              <Box className="icon-circle"><FontAwesomeIcon icon={faNetworkWired} size="2x" /></Box>
              <Typography variant="body1">Provide a centralized place for<br></br>
               students to discover learning <br></br>
               support programs and their services</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box className="icon-circle"><FontAwesomeIcon icon={faBell} size="2x" /></Box>
              <Typography variant="body1">Remind students to attend <br></br>
              learning support events they have <br></br>
              registered for</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box className="icon-circle"><FontAwesomeIcon icon={faComments} size="2x" /></Box>
              <Typography variant="body1">Ease communication between <br></br>
              learning support programs and <br></br>
              students</Typography>
            </Grid>
          </Grid>
          </Box>
        </Box>
        <hr className="section-divider" />
        <Box my={4}>
          <Typography variant="h1" gutterBottom>Who can use Zot Support?</Typography>
          <Typography variant="body1" gutterBottom>Zot Support is available to anyone with an active UC Net ID.</Typography>
          <Box className="image-box" my={2}>
            <img src="https://media.licdn.com/dms/image/C561BAQGQMueiSzReaA/company-background_10000/0/1585487902251/university_of_california_irvine_cover?e=2147483647&v=beta&t=yt76yP3hmr2Z--Tobw9YcYdV8PcYAFayLm6Pe4QwpJE" alt="UC Irvine" />
          </Box>
        </Box>
        <hr className="section-divider" />
        <Box my={4}>
          <Typography variant="h1" gutterBottom>Our Sponsor For ZOTSUPPORT: UCI LARC</Typography>
          <Box my={2}>
             <div>
              {/* Using the image-box style for the sponsor image */}
          <Box className="image-box">
              <img src="https://bpb-us-w2.wpmucdn.com/wp.ovptl.uci.edu/dist/6/11/files/2016/06/LARC-UCI-Social-Share-Image.jpg" alt="UCI LARC" />
          </Box>
     </div>
    </Box>
  </Box>
 </Container>
    </div>
  );
}

export default LandingPage;
