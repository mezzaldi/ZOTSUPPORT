import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button"; // Import Button from Material UI
import CardCarousel from "../../components/CardCarousel";
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation


const SearchResultsPage = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Hook for programmatic navigation
    const searchResults = location.state?.searchResults;

    // Deduplicate programs based on 'program_id'
    const uniquePrograms = searchResults?.programs ? Array.from(new Map(searchResults.programs.map(item => [item['program_id'], item])).values()) : [];

    const hasResults = uniquePrograms?.length > 0 || searchResults?.events?.length > 0;

    return (
        <div className="pageContent">
             <Typography variant="h1">Search Results</Typography>
            <div className="h2Container">
               
                {hasResults ? (
                    <>
                        {/* Conditional rendering for uniquePrograms */}
                        {uniquePrograms && uniquePrograms.length > 0 && (
                            <div>
                                <Typography variant="h2">Programs</Typography>
                                <CardCarousel cardType="program" data={uniquePrograms} />
                            </div>
                        )}
                        {/* Rendering events if they exist */}
                        {searchResults?.events && (
                            <div>
                                <Typography variant="h2">Events</Typography>
                                <CardCarousel cardType="event" data={searchResults.events} />
                            </div>
                        )}
                    </>
                ) : (
                    <div style={{ textAlign: 'center', marginTop: '1.25rem' }}> {/* Changed from px to rem */}
                        <Typography variant="h5">No search results found.</Typography>
                        <Button variant="contained" onClick={() => navigate('/discover')} style={{ marginTop: '0.625rem' }}>Back</Button> {/* Changed from px to rem */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchResultsPage;
