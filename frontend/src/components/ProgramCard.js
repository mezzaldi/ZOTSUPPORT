import React from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const ProgramCard = (props) => {
  return (
    <div>

        <Card sx={{ maxWidth: 345 }}>

            {/* The program header image */}
            <CardMedia
                sx={{ height: 140 }}
                image="/images/placeholder.jpg"
                title="program header image"
            />

            <CardContent>
                {/*gutterBottom gives the text a bottom margin*/}
                <Typography gutterBottom variant="h2">
                {props.programName}
                </Typography>

                <Typography variant="subtitle1" color="text.secondary">
                Brief program description
                </Typography>
            </CardContent>

            <CardActions>
                <Button size="small" variant="contained" color="primary">
                    Unfollow
                </Button>
            </CardActions>
            
        </Card>
    </div>
  );
};

export default ProgramCard;