import React from 'react';
import { Paper, Button, Typography, Container, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const ViewNotification = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/Notifications');
  };

  return (
    <Container maxWidth={false} disableGutters style={{ padding: '2rem 0' }}>
      <Box style={{ padding: '0 2rem' }}>
        <Button startIcon={<ArrowBackIcon />} onClick={handleBack}>
          Back
        </Button>
      </Box>
      <Paper elevation={3} style={{ padding: '2rem', margin: '2rem 2rem 0 2rem' }}>
        <Typography variant="h5" gutterBottom component="div">
          Today's class - from IN4MATX 191B
        </Typography>
        <Typography variant="body1" paragraph>
            Everyone – <br></br>
            The decision as to whether to hold class today or not has been a difficult one (as opposed to yesterday when it was easy), because while it was practically a monsoon this morning, the rain has eased up significantly since then and I don’t know how it will go – by this afternoon it could be another storm, or it could be sunny; I just can’t tell.
        </Typography>
        <Typography variant="body1" paragraph>
            The question then becomes is it worth it to have students drive in, sometimes from great distances, in the rain and dangerous driving conditions for what was intended to be an open class anyway.
            Having heard from colleagues and others, it seems the consensus is that the weather is still a hindrance, so I have decided that today’s class will be a wash, we won't meet today and will instead meet on Thursday as usual. I’ll reschedule the guest speakers we were going to have today. Please continue to make progress on your projects, and we’ll have some meetings next class.
        </Typography>
        <Button variant="contained" color="primary">
          Action
        </Button>
      </Paper>
    </Container>
  );
};

export default ViewNotification;
