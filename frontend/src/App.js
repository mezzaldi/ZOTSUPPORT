// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// pages
import CreateNewProgramPage from "./routes/program/CreateNewProgramPage";
import CreateNewEventPage from "./routes/event/CreateNewEventPage";
import CreateNewNotificationPage from "./routes/notifications/CreateNewNotificationPage";
import LandingPage from "./routes/landing/LandingPage";
import AboutUsPage from "./routes/about/AboutUsPage";
import SignInPage from "./routes/sign in/SignInPage";
import NotificationsPage from "./routes/notifications/NotificationsPage";
import DiscoverPage from "./routes/discover/DiscoverPage";
import UserDashboardPage from "./routes/dashboard/UserDashboardPage";
import ProgramDashboardPage from "./routes/dashboard/ProgramDashboardPage";
import Navbar from "./components/Navbar";
import ProgramEventsPage from "./routes/program/ProgramEventsPage";
import ProgramHomePage from "./routes/program/ProgramHomePage";
import SearchResultsPage from "./routes/discover/SearchResultsPage";
import EventHomePage from "./routes/event/EventHomePage";

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
import UserSetting from "./routes/usersettings/UserSetting";
import ViewNotification from "./routes/notifications/ViewNotification";
import ProgramSelectDashboard from "./routes/dashboard/ProgramSelectDashboard";
import EditProgramForm from "./routes/program/EditProgramForm";


import EditEventForm  from "./routes/event/EditEventForm";

import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import UserImg from "./UserImg.jpeg";

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
    // TEST UCINETID - User with this UCINetID will be loaded in from the database.
    // MUST REPLACE WHEN AUTHENTICATION IS IMPLEMENTED.
    // Use "5" for test Administrator. Use "1" for test Student.
    const ucinetid = "1";

    // load in the user's data from the database based on UCINetID
    const [userData, setUserData] = useState();
    useEffect(() => {
        const getUserData = async () => {
            const res = await axios
                .get(`http://localhost:3001/userData/:${ucinetid}`)
                .catch((err) => console.log(err));

            setUserData(res.data);
        };
        getUserData();
    }, [ucinetid]);

    // What userData contains:
    // email
    // profileimage
    // firstname
    // lastname
    // ucinetid
    // adminprograms: list of programs the user is an administrator for
    // superadminprograms: list of programs the user is a super administrator for

    return (
        userData && (
            <UserContext.Provider value={userData}>
                <ThemeProvider theme={globalTheme}>
                    <Router>
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/SignIn" element={<SignInPage />} />
                            <Route path="/About" element={<AboutUsPage />} />
                            <Route
                                path="/CreateNewProgram"
                                element={<CreateNewProgramPage />}
                            />
                            <Route
                                path="/CreateNewEvent/:program_id"
                                element={<CreateNewEventPage />}
                            />

                            <Route
                                path="/CreateNewNotification/:program_id"
                                element={<CreateNewNotificationPage />}
                            />

                            <Route
                                path="/Discover"
                                element={<DiscoverPage />}
                            />
                            <Route
                                path="/Dashboard"
                                element={<UserDashboardPage />}
                            />
                            <Route
                                path="/Notifications"
                                element={<NotificationsPage />}
                            />
                            <Route
                                path="/ProgramEvents/:program_id"
                                element={<ProgramEventsPage />}
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
                                path="/ProgramDashboardPage/:program_id"
                                element={<ProgramDashboardPage />}
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
                                path="/ProgramSelectDashboard"
                                element={<ProgramSelectDashboard />}
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
