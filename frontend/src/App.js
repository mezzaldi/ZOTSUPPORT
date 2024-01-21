// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// pages
import CreateNewProgramPage from './routes/CreateNewProgramPage';
import LandingPage from './routes/LandingPage';
import AboutUsPage from './routes/AboutUsPage';
import SignInPage from './routes/SignInPage';
import StudentDashboardPage from './routes/StudentDashboard';

// components
import Navbar from './components/Navbar';

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
      fontSize: '32px',
      fontFamily: 'Raleway',
      color: primaryTextColor
    },
    h2: {
      fontSize: '26px',
      fontFamily: 'Lato',
      color: primaryTextColor
    },
    h3: {
      fontSize: '20px',
      fontFamily: 'Open Sans',
      color: primaryTextColor
    },
    body1: {
      fontSize: '16px',
      fontFamily: 'Open Sans',
      color: primaryTextColor
    },
    subtitle1: {
      fontSize: '14px',
      fontFamily: 'Open Sans',
      color: primaryTextColor
    },
    button: {
      textTransform: 'none',
      fontFamily: 'Open Sans',
      fontSize: '16px',
    }
  }

});

globalTheme = responsiveFontSizes(globalTheme);

const App = () => {
  return (
    <ThemeProvider theme={globalTheme}>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/SignIn" element={<SignInPage/>} />
          <Route path="/AboutUs" element={<AboutUsPage/>} />
          <Route path="/CreateNewProgram" element={<CreateNewProgramPage/>} />
          <Route path="/StudentDashboard" element={<StudentDashboardPage/>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
