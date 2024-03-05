import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import CardCarousel from "../../components/CardCarousel";
import axios from "axios";
import { Grid, Button } from "@mui/material";

const DiscoverPage = () => {
    // State variables for storing data
    const [upcomingEvents, setUpcomingEvents] = useState();
    const [popularEvents, setPopularEvents] = useState();
    const [popularPrograms, setPopularPrograms] = useState();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState({ programs: [], events: [] });
    const [showSearchResults, setShowSearchResults] = useState(false); // Flag to control search results visibility

    // Fetch upcoming events
    useEffect(() => {
        console.log("useeffect upcoming events");
        const getUpcomingEvents = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/upcoming-events`);
                setUpcomingEvents(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getUpcomingEvents();
    }, []);

    // Fetch popular events
    useEffect(() => {
        console.log("useeffect popular events");
        const getPopularEvents = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/popular-upcoming-events`);
                setPopularEvents(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getPopularEvents();
    }, []);

    // Fetch popular programs
    useEffect(() => {
        console.log("useeffect popular programs");
        const getPopularPrograms = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/popular-programs`);
                setPopularPrograms(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getPopularPrograms();
    }, []);

    // Handle search input change
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Handle search submit
    const handleSearchSubmit = () => {
        if (searchQuery.trim() !== "") {
            setShowSearchResults(true); // Set flag to show search results
            setSearchResults({ programs: [], events: [] }); // Clear previous search results
            fetchSearchResults();
        } else {
            setShowSearchResults(false); // Hide search results if search query is empty
        }
    };

    // Filter data based on search query
    const filterData = (data) => {
        return data.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    // Fetch search results
    const fetchSearchResults = async () => {
        try {
            console.log(searchQuery);
            const res = await axios.get(`http://localhost:3001/search?tags=${searchQuery}`);
            setSearchResults(res.data);
        } catch (error) {
            console.error("Error searching:", error);
        }
    };

    // Update search results on pressing Enter
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSearchSubmit();
        }
    };

    return (
        <div className="pageContent">
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={9} style={{ display: 'flex' }}>
                    <input
                        type="text"
                        placeholder="Search events and programs"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        onKeyPress={handleKeyPress}
                        style={{ flex: 1, marginRight: 8, padding: "8px" }} // Adjust width and padding as needed
                    />
                    <Button variant="contained" onClick={handleSearchSubmit}>Search</Button>
                </Grid>
            </Grid>
            {showSearchResults && searchQuery.trim() !== "" && (
                <div className="h2Container">
                    <Typography variant="h2">Search Results</Typography>
                    {searchResults.events && (
                        <CardCarousel cardType="event" data={searchResults.events} />
                    )}
                    {searchResults.programs && (
                        <CardCarousel cardType="program" data={searchResults.programs} />
                    )}
                </div>
            )}
            <div className="h2Container">
                <Typography variant="h2">Upcoming events</Typography>
                {upcomingEvents && (
                    <CardCarousel cardType="event" data={filterData(upcomingEvents)} />
                )}
            </div>
            <div className="h2Container">
                <Typography variant="h2">Popular events</Typography>
                {popularEvents && (
                    <CardCarousel cardType="event" data={filterData(popularEvents)} />
                )}
            </div>
            <div className="h2Container">
                <Typography variant="h2">Popular learning support programs</Typography>
                {popularPrograms && (
                    <CardCarousel cardType="program" data={filterData(popularPrograms)} />
                )}
            </div>
        </div>
    );
};

export default DiscoverPage;
