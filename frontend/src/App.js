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

// global stylesheet
import './styles.scss';

const App = () => {
  return (
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
  );
};

export default App;
