import React, { useState, useRef } from 'react';
import { Typography, Button } from "@mui/material";
import '../../styles.scss'; 

const UserSetting = () => {
  const [userProfilePicture, setUserProfilePicture] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTCB0N0eL8VRom9g4DXmnQZBe_jFmtufHDiw&usqp=CAU');
  const fileInputRef = useRef(null);

  const handleProfilePictureChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const newProfilePic = URL.createObjectURL(event.target.files[0]);
      setUserProfilePicture(newProfilePic);
    }
  };

  const handleClickChangePhoto = () => {
    fileInputRef.current.click();
  };

  const handleLogout = () => {
    window.location.href = "/LandingPage"; 
  };

  const [upcomingEvents, setUpcomingEvents] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(true);
  const [forwardEmail, setForwardEmail] = useState(true);
  const [newMessages, setNewMessages] = useState(true);
  const [newEvents, setNewEvents] = useState(true);
  const [getEmailUpdates, setGetEmailUpdates] = useState(false); // State for email updates checkbox

  const [darkMode, setDarkMode] = useState(false);
  const [colorBlindMode, setColorBlindMode] = useState(false);
  const [highContrastMode, setHighContrastMode] = useState(false);

  return (
    <div className="pageContent">
      <div className="h1Container">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h1">
            Settings
          </Typography>
          <Button variant="contained" color="primary" onClick={handleLogout} style={{ marginLeft: 'auto', marginRight: '20px' }}>
            Log Out
          </Button>
        </div>
      </div>

      <hr />
      <br />
      
      <div className="settings-profile">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={userProfilePicture} alt="Profile" className="profileImg" style={{ width: '150px', height: '150px' }}/>
          <Typography variant="body1" style={{ marginLeft: '20px' }}>
            Logged in as Peter Anteater
          </Typography>
        </div>
        <Typography
          variant="body1"
          component="span"
          onClick={handleClickChangePhoto}
          style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue', marginLeft: '20px' }}
        >
          Change profile photo
        </Typography>
        <input
          ref={fileInputRef}
          type="file"
          hidden
          onChange={handleProfilePictureChange}
        />
      </div>
      
      <hr />

      <div className="settings-notifications">
        <div className="h2Container">
          <Typography variant="h5">Notifications</Typography>
        </div>
        <div className="checkboxContainer">
          <Typography component="label">
            <input type="checkbox" checked={upcomingEvents} onChange={() => setUpcomingEvents(!upcomingEvents)} /> Upcoming events by my learning program
          </Typography>
        </div>
        <div className="checkboxContainer">
          <Typography component="label">
            <input type="checkbox" checked={weeklySummary} onChange={() => setWeeklySummary(!weeklySummary)} /> Program weekly summary
          </Typography>
        </div>
        <div className="checkboxContainer">
          <Typography component="label">
            <input type="checkbox" checked={forwardEmail} onChange={() => setForwardEmail(!forwardEmail)} /> Forward notifications to email
          </Typography>
        </div>
        <div className="checkboxContainer">
          <Typography component="label">
            <input type="checkbox" checked={newMessages} onChange={() => setNewMessages(!newMessages)} /> New messages from learning programs
          </Typography>
        </div>
        <div className="checkboxContainer">
          <Typography component="label">
            <input type="checkbox" checked={newEvents} onChange={() => setNewEvents(!newEvents)} /> New events posted by learning programs I follow
          </Typography>
        </div>
        <div className="checkboxContainer">
          <Typography component="label">
            <input type="checkbox" checked={getEmailUpdates} onChange={() => setGetEmailUpdates(!getEmailUpdates)} /> Get Email Updates
          </Typography>
        </div>
      </div>

      <hr />

      <div className="settings-accessibility">
        <div className="h2Container">
          <Typography variant="h5">Accessibility</Typography>
        </div>
        <div className="checkboxContainer">
          <Typography component="label">
            <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} /> Dark mode
          </Typography>
        </div>
        <div className="checkboxContainer">
          <Typography component="label">
            <input type="checkbox" checked={colorBlindMode} onChange={() => setColorBlindMode(!colorBlindMode)} /> Colorblind mode
          </Typography>
        </div>
        <div className="checkboxContainer">
          <Typography component="label">
            <input type="checkbox" checked={highContrastMode} onChange={() => setHighContrastMode(!highContrastMode)} /> High contrast text
          </Typography>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button variant="contained" color="primary" className="btn-save-changes">Save Changes</Button>
      </div>
    </div>
  );
}

export default UserSetting;
