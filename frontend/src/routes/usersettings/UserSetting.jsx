import React, { useState, useRef } from 'react';
import './UserSetting.css';
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

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleColorBlindModeToggle = () => {
    setColorBlindMode(!colorBlindMode);
  };

  const handleHighContrastModeToggle = () => {
    setHighContrastMode(!highContrastMode);
  };

  const handleUpcomingEventsChange = () => setUpcomingEvents(!upcomingEvents);
  const handleWeeklySummaryChange = () => setWeeklySummary(!weeklySummary);
  const handleForwardEmailChange = () => setForwardEmail(!forwardEmail);
  const handleNewMessagesChange = () => setNewMessages(!newMessages);
  const handleNewEventsChange = () => setNewEvents(!newEvents);

  const bodyClass = [
    darkMode ? 'dark-mode' : '',
    colorBlindMode ? 'colorblind-mode' : '',
    highContrastMode ? 'high-contrast' : '',
  ].join(' ');

  return (
    <div className={`settings-container ${bodyClass}`}>
      <div className="settings-header">
        <Typography variant="h4">Settings</Typography>
      </div>

      <div className="settings-profile">
        <div className="settings-avatar">
          <img src={userProfilePicture} alt="Profile" className="avatar-image" />
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleProfilePictureChange}
            style={{ display: 'none' }}
          />
          <Typography
            variant="body1"
            component="span"
            onClick={handleClickChangePhoto}
            style={{ cursor: 'pointer', textDecoration: 'underline', color: '#0E1C4C', marginLeft: '20px' }}
          >
            Change profile photo
          </Typography>
        </div>
        <div className="settings-info">
          <Typography variant="body1" className="user-name">
            Logged in as Peter Anteater
          </Typography>
          <Button variant="contained" color="primary" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </div>

      <div className="settings-notifications">
        <Typography variant="h5">Notifications</Typography>
        <div>
          <Typography component="label">
            <input type="checkbox" checked={upcomingEvents} onChange={handleUpcomingEventsChange} /> Upcoming events by my learning program
          </Typography>
        </div>
        <div>
          <Typography component="label">
            <input type="checkbox" checked={weeklySummary} onChange={handleWeeklySummaryChange} /> Program weekly summary
          </Typography>
        </div>
        <div>
          <Typography component="label">
            <input type="checkbox" checked={forwardEmail} onChange={handleForwardEmailChange} /> Forward notifications to email
          </Typography>
        </div>
        <div>
          <Typography component="label">
            <input type="checkbox" checked={newMessages} onChange={handleNewMessagesChange} /> New messages from learning programs
          </Typography>
        </div>
        <div>
          <Typography component="label">
            <input type="checkbox" checked={newEvents} onChange={handleNewEventsChange} /> New events posted by learning programs I follow
          </Typography>
        </div>
        <Button variant="contained" color="primary">
          Get Email Updates
        </Button>
      </div>

      <div className="settings-accessibility">
        <Typography variant="h5">Accessibility</Typography>
        <div>
          <Typography component="label">
            <input type="checkbox" checked={darkMode} onChange={handleDarkModeToggle} /> Dark mode
          </Typography>
        </div>
        <div>
          <Typography component="label">
            <input type="checkbox" checked={colorBlindMode} onChange={handleColorBlindModeToggle} /> Colorblind mode
          </Typography>
        </div>
        <div>
          <Typography component="label">
            <input type="checkbox" checked={highContrastMode} onChange={handleHighContrastModeToggle} /> High contrast text
          </Typography>
        </div>
      </div>

      <Button variant="contained" color="primary" className="btn-save-changes">
        Save Changes
      </Button>
    </div>
  );
}

export default UserSetting;
