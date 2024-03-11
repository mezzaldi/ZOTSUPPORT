// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// pages
import CreateNewProgramPage from "./routes/CreateNewProgramPage";
import CreateNewEventPage from "./routes/CreateNewEventPage";
import CreateNewNotificationPage from "./routes/CreateNewNotificationPage";
import LandingPage from "./routes/LandingPage";
import AboutUsPage from "./routes/about/AboutUsPage";
import SignInPage from "./routes/SignInPage";
import NotificationsPage from "./routes/notifications/NotificationsPage";
import DiscoverPage from "./routes/discover/DiscoverPage";
import DashboardPage from "./routes/dashboard/DashboardPage";
import Navbar from "./components/Navbar";
import ProgramEventsPage from "./routes/program/ProgramEventsPage";
import ProgramHomePage from "./routes/program/ProgramHomePage";
import SearchResultsPage from "./routes/discover/SearchResultsPage";
// global stylesheet
import "./styles.scss";
// user role
import UserContext from "./user/UserContext";
// MUI
import {
    createTheme,
    ThemeProvider,
    responsiveFontSizes,
} from "@mui/material/styles";
import UserSetting from "./routes/UserSetting";
import ViewNotification from "./routes/notifications/ViewNotification";
import ProgramDashboard from "./routes/dashboard/ProgramDashboard";
import EditProgramForm from "./routes/EditProgramForm";
import EventHomePage from "./routes/event/EventHomePage";

import EditEventForm  from "./routes/EditEventForm";

import { useContext, useEffect } from "react";
import axios from "axios";
import { useState } from "react";


const primaryTextColor = "#242424";

// GLOBAL STYLING WILL BE KEPT HERE INSTEAD OF CSS SHEET
let globalTheme = createTheme({
    // creating custom colors for our app
    palette: {
        // this is the primary button blue
        primary: {
            main: "#2744A6",
            light: "#2744A6",
            dark: "#2744A6",
            contrastText: "#FFFFFF",
        },
    },
    // setting font standards for our app
    typography: {
        h1: {
            fontSize: 32,
            fontFamily: "Raleway",
            color: primaryTextColor,
        },
        h2: {
            fontSize: 26,
            fontFamily: "Lato",
            color: primaryTextColor,
        },
        h3: {
            fontSize: 18,
            fontFamily: "Open Sans",
            color: primaryTextColor,
        },
        body1: {
            fontSize: 16,
            fontFamily: "Open Sans",
            color: primaryTextColor,
        },
        subtitle1: {
            fontSize: 14,
            fontFamily: "Open Sans",
            color: primaryTextColor,
        },
        button: {
            textTransform: "none",
            fontFamily: "Open Sans",
            fontSize: 16,
        },
    },
});

globalTheme = responsiveFontSizes(globalTheme);

const App = () => {
    // Using single test UCINetID for now
    const ucinetid = "5";

    // load in the user's data from the database based on UCINetID
    const [userData2, setUserData] = useState();
    useEffect(() => {
        const getUserData = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/userData/:${ucinetid}`);
                const userobject = res.data[0]; // This line is likely causing the error
                setUserData(res.data);
            } catch (err) {
                console.log('Error fetching user data:', err);
            }
        };
        getUserData();
    }, [ucinetid]);

    // userRole could be 'student' 'admin' or 'superadmin'
    const userData = {
        role: "superadmin",
        firstname: "Peter",
        lastname: "Anteater",
        program_id: 1,
        ucinetid: 5,
    };

    return (
        userData && (
            <UserContext.Provider value={userData}>
                <ThemeProvider theme={globalTheme}>
                    <Router>
                        {/* {userRole === "student" ? <Navbar /> : <AdminNavbar />} */}
                        <Navbar userData={userData} />
                        <Routes>
                            <Route
                                path="/"
                                element={<LandingPage />}
                            />
                            <Route path="/SignIn" element={<SignInPage />} />
                            <Route path="/About" element={<AboutUsPage />} />
                            <Route
                                path="/CreateNewProgram"
                                element={<CreateNewProgramPage />}
                            />
                            <Route
                                path="/CreateNewEvent"
                                element={<CreateNewEventPage />}
                            />

                            <Route 
                                path='/CreateNewNotification'
                                element={<CreateNewNotificationPage />}
                            />

                            <Route
                                path="/Discover"
                                element={<DiscoverPage />}
                            />
                            <Route
                                path="/Dashboard"
                                element={<DashboardPage />}
                            />
                            <Route
                                path="/Notifications"
                                element={<NotificationsPage />}
                            />
                            <Route
                                path="/ProgramEvents"
                                element={<ProgramEventsPage />}
                            />
                            {/* GET RID OF THIS LATER SINCE ITS A BLANK TEMPLATE */}
                            <Route
                                path="/ProgramHomePage"
                                element={<ProgramHomePage />}
                            />
                            <Route
                                path="/ProgramHomePage/:program_id"
                                element={<ProgramHomePage />}
                            />
                             <Route
                                path="/EventHomePage"
                                element={<EventHomePage />}
                            />
                            <Route
                                path="/EventHomePage/:event_id"
                                element={<EventHomePage />}
                            />
                            <Route
                                path="/UserSetting"
                                element={<UserSetting />}
                            />
                            <Route
                                path="/ViewNotification"
                                element={<ViewNotification />}
                            />
                            <Route
                                path="/ProgramDashboard"
                                element={<ProgramDashboard />}
                            />
                           <Route 
                                path="/EditProgramForm/:program_id" 
                                element={<EditProgramForm />} 
                            />

                            <Route
                                path="/ProgramHomePage"
                                element={<ProgramHomePage />}
                            />
                             <Route
                                path="/EditEventForm"
                                element={<EditEventForm />}
                            />
                            <Route 
                                path="/EditEventForm/:event_id" 
                                element={<EditEventForm />} 
                            />
                            <Route 
                                path="/search-results" 
                                element={<SearchResultsPage />} 
                            />
                        </Routes>
                    </Router>
                </ThemeProvider>
            </UserContext.Provider>
        )
    );
};

export default App;
