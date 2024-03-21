import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import CardCarousel from "../../components/CardCarousel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Autocomplete from '@mui/material/Autocomplete';

import SearchResultsPage from "./SearchResultsPage";

const DiscoverPage = () => {
    const [searchTags, setSearchTags] = useState("");
    const [searchResults, setSearchResults] = useState(null);
    const navigate = useNavigate();

    const [programs, setPrograms] = useState([]);
    const [events, setEvents] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [popularEvents, setPopularEvents] = useState([]);
    const [popularPrograms, setPopularPrograms] = useState([]);
    const [tags, setTags] = useState([]);

    const [selectedLevelTags, setSelectedLevelTags] = useState([]);
    const [selectedSubjectTags, setSelectedSubjectTags] = useState([]);
    const [selectedEventTypeTags, setSelectedEventTypeTags] = useState([]);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const programsRes = await axios.get('http://localhost:3001/programs');
                setPrograms(programsRes.data);

                const eventsRes = await axios.get('http://localhost:3001/events');
                setEvents(eventsRes.data);

                const upcomingEventsRes = await axios.get('http://localhost:3001/upcoming-events');
                setUpcomingEvents(upcomingEventsRes.data);

                const popularEventsRes = await axios.get('http://localhost:3001/popular-upcoming-events');
                setPopularEvents(popularEventsRes.data);

                const popularProgramsRes = await axios.get('http://localhost:3001/popular-programs');
                setPopularPrograms(popularProgramsRes.data);

                const tagsRes = await axios.get('http://localhost:3001/tags');
                setTags(tagsRes.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchAllData();
    }, []);

    const handleSearch = () => {
        const trimmedSearchTags = searchTags.trim().toLowerCase();
    
        const filteredPrograms = programs.filter(program => {
            const nameMatch = trimmedSearchTags === "" || program.program_name.toLowerCase().includes(trimmedSearchTags);
            const levelTagMatch = selectedLevelTags.length === 0 || selectedLevelTags.every(tag => program.tags.includes(tag));
            const subjectTagMatch = selectedSubjectTags.length === 0 || selectedSubjectTags.every(tag => program.tags.includes(tag));
            const eventTypeTagMatch = selectedEventTypeTags.length === 0 || selectedEventTypeTags.every(tag => program.tags.includes(tag));
            
            return nameMatch && levelTagMatch && subjectTagMatch && eventTypeTagMatch;
        });
    
        const filteredEvents = events.filter(event => {
            const nameMatch = trimmedSearchTags === "" || event.event_name.toLowerCase().includes(trimmedSearchTags);
            const levelTagMatch = selectedLevelTags.length === 0 || selectedLevelTags.every(tag => event.tags.includes(tag));
            const subjectTagMatch = selectedSubjectTags.length === 0 || selectedSubjectTags.every(tag => event.tags.includes(tag));
            const eventTypeTagMatch = selectedEventTypeTags.length === 0 || selectedEventTypeTags.every(tag => event.tags.includes(tag));
    
            return nameMatch && levelTagMatch && subjectTagMatch && eventTypeTagMatch;
        });
    
        setSearchResults({ programs: filteredPrograms, events: filteredEvents });
        navigate("/search-results", { state: { searchResults: { programs: filteredPrograms, events: filteredEvents } } });
    };
    


    let levelTags = [];
    let subjectTags = [];
    let eventTypeTags = [];
    tags.forEach(tag => {
        if (tag.tag_category === "Level") {
            levelTags.push(tag.tag_name);
        } else if (tag.tag_category === "Subject") {
            subjectTags.push(tag.tag_name);
        } else if (tag.tag_category === "Event Type") {
            eventTypeTags.push(tag.tag_name);
        }
    });

    return (
        <div className="pageContent">
            <div className="searchAndFilterContainer" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="searchContainer" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <TextField
                        label="Search for Programs and Events..."
                        type="text"
                        value={searchTags}
                        onChange={(e) => setSearchTags(e.target.value)}
                        variant="outlined"
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                        style={{ flexGrow: 1 }}
                    />
                    <Button variant="contained" onClick={handleSearch}>Search</Button>
                </div>

                <div className="filterContainer" style={{ display: 'flex', gap: '1rem' }}>
                    <Autocomplete
                        multiple
                        options={levelTags}
                        onChange={(event, newValue) => setSelectedLevelTags(newValue)}
                        renderInput={(params) => (
                            <TextField {...params} label="Filter by Level" placeholder="Levels" />
                        )}
                        size="small"
                        style={{ width: 200 }}
                    />

                    <Autocomplete
                        multiple
                        options={subjectTags}
                        onChange={(event, newValue) => setSelectedSubjectTags(newValue)}
                        renderInput={(params) => (
                            <TextField {...params} label="Filter by Subject" placeholder="Subjects" />
                        )}
                        size="small"
                        style={{ width: 200 }}
                    />

                    <Autocomplete
                        multiple
                        options={eventTypeTags}
                        onChange={(event, newValue) => setSelectedEventTypeTags(newValue)}
                        renderInput={(params) => (
                            <TextField {...params} label="Filter by Event Type" placeholder="Event Types" />
                        )}
                        size="small"
                        style={{ width: 200 }}
                    />
                </div>
            </div>

            {searchResults && <SearchResultsPage searchResults={searchResults} />}
            
            <div className="h2Container">
                <Typography variant="h2">Upcoming events</Typography>
                {upcomingEvents && <CardCarousel cardType="event" data={upcomingEvents} />}
            </div>
            <div className="h2Container">
                <Typography variant="h2">Popular events</Typography>
                {popularEvents && <CardCarousel cardType="event" data={popularEvents} />}
            </div>
            <div className="h2Container">
                <Typography variant="h2">Popular learning support programs</Typography>
                {popularPrograms && <CardCarousel cardType="program" data={popularPrograms} />}
            </div>
        </div>
    );
};

export default DiscoverPage;

                       
