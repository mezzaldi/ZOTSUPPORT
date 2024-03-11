import React from "react";
import Program from "../../CreateProgram";
import { Typography } from "@mui/material";

const CreateNewProgramPage = () => {
    return (
        <div className="pageContent">
            <div className="h1Container">
                <Typography variant="h1">Create a New Program</Typography>
            </div>
            <Program />
        </div>
    );
};

export default CreateNewProgramPage;
