import React, { useState, useRef } from 'react';
import '../../styles.scss'; 
import { Typography, Button } from "@mui/material";

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

  const [upcomingEvents, setUpcomingEvents] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(true);
  const [forwardEmail, setForwardEmail] = useState(true);
  const [newMessages, setNewMessages] = useState(true);
  const [newEvents, setNewEvents] = useState(true);

  const [darkMode, setDarkMode] = useState(false);
  const [colorBlindMode, setColorBlindMode] = useState(false);
  const [highContrastMode, setHighContrastMode] = useState(false);

  const handleLogout = () => {
    window.location.href = "/LandingPage"; 
  };

  return (
    <div className="pageContent">
      <div className="h1Container">
        <Typography variant="h4">Settings</Typography>
      </div>

      <div className="cardContainer settings-profile">
        <div className="card">
          <img src={userProfilePicture} alt="Profile" className="profileImg" />
          <input
            ref={fileInputRef}
            type="file"
            hidden
            onChange={handleProfilePictureChange}
          />
          <Typography
            variant="body1"
            component="span"
            onClick={handleClickChangePhoto}
            className="cardText"
            style={{ cursor: 'pointer', textDecoration: 'underline', color: '#0E1C4C', marginLeft: '20px' }}
          >
            Change profile photo
          </Typography>
        </div>
        <div className="settings-info">
          <Typography variant="body1">
            Logged in as Peter Anteater
          </Typography>
          <Button variant="contained" color="primary" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </div>

      <div className="tableContainer settings-notifications">
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
        <Button variant="contained" color="primary" className="upcomingEventBar">
          Get Email Updates
        </Button>
      </div>

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

      <div className="formQuestion">
        <Button variant="contained" color="primary" className="btn-save-changes">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
export default UserSetting;

         
