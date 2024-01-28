// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// pages
import CreateNewProgramPage from './routes/CreateNewProgramPage';
import LandingPage from './routes/LandingPage';
import AboutUsPage from './routes/about/AboutUsPage';
import SignInPage from './routes/SignInPage';
import StudentDashboardPage from './routes/dashboard/StudentDashboardPage';
import AdminDashboardPage from './routes/dashboard/AdminDashboardPage';
import NotificationsPage from './routes/notifications/NotificationsPage';
import DiscoverPage from './routes/discover/DiscoverPage';

// components
import Navbar from './components/Navbar';
import AdminNavbar from './components/AdminNavbar';
// global stylesheet
import './styles.scss';

// MUI 
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';

const primaryTextColor = '#242424';


// GLOBAL STYLING WILL BE KEPT HERE INSTEAD OF CSS SHEET
let globalTheme = createTheme({
  // creating custom colors for our app
  palette: {
    // this is the primary button blue
    primary: {
      main: '#2744A6',
      light: '#2744A6',
      dark: '#2744A6', 
      contrastText: '#FFFFFF',
    },
  },
  // setting font standards for our app
  typography: {
    h1: {
      fontSize: 32,
      fontFamily: 'Raleway',
      color: primaryTextColor
    },
    h2: {
      fontSize: 26,
      fontFamily: 'Lato',
      color: primaryTextColor,
    },
    h3: {
      fontSize: 18,
      fontFamily: 'Open Sans',
      color: primaryTextColor,
    },
    body1: {
      fontSize: 16,
      fontFamily: 'Open Sans',
      color: primaryTextColor
    },
    subtitle1: {
      fontSize: 14,
      fontFamily: 'Open Sans',
      color: primaryTextColor
    },
    button: {
      textTransform: 'none',
      fontFamily: 'Open Sans',
      fontSize: 16,
    }
  }

});

globalTheme = responsiveFontSizes(globalTheme);

const App = () => {
  const userRole = 'student'; //need to be change to authetication
  return (
    <ThemeProvider theme={globalTheme}>
      <Router>
      {userRole === 'student' ? <Navbar /> : <AdminNavbar />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/SignIn" element={<SignInPage />} />
          <Route path="/SignIn/dashboard/admin" element={<AdminDashboardPage />} />
          <Route path="/SignIn/dashboard/student" element={<StudentDashboardPage />} />
          <Route path="/AboutUs" element={<AboutUsPage />} />
          <Route path="/CreateNewProgram" element={<CreateNewProgramPage />} />
          <Route path="/Discover" element={<DiscoverPage />} />
          <Route path="/Dashboard/student" element={<StudentDashboardPage />} />
          <Route path="/Dashboard/admin" element={<AdminDashboardPage />} />
          <Route path="/Notifications" element={<NotificationsPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
