import React from 'react';
import { Grid, Typography, Card, CardActionArea, CardMedia, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProgramDashboard = () => {
  const navigate = useNavigate();

  const programs = [
    {
      title: 'LARC',
      imageUrl: 'https://pbs.twimg.com/profile_images/1100149741004845057/lP63_CLQ_400x400.png', 
    },
    {
      title: 'Program Name 2',
      imageUrl: '/images/placeholder.jpg', 
    },
  ];

  const handleCardClick = (title) => {
    navigate(`/program/${title}`); 
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h1" gutterBottom>
        Admin's Dashboard
      </Typography>
      <Grid container spacing={4}>
        {programs.map((program, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card>
              <CardActionArea onClick={() => handleCardClick(program.title)}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={program.imageUrl}
                  title={program.title}
                />
                <CardContent>
                  <Typography variant="h5">
                    {program.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardActionArea onClick={() => navigate('/CreateNewProgramPage')} style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  + New Program
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProgramDashboard;
