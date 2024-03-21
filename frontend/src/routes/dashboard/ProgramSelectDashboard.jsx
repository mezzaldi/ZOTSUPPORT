import React from "react";
import {
    Grid,
    Typography,
    Card,
    CardActionArea,
    CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useContext, useEffect } from "react";
import UserContext from "../../user/UserContext";
import axios from "axios";
import { useState } from "react";
import ProgramCard from "../../components/ProgramCard";

const ProgramSelectDashboard = () => {
    const userData = useContext(UserContext);

    // Get the programs the user is an admin for
    const [programs, setPrograms] = useState();
    useEffect(() => {
        const getPrograms = async () => {
            const res = await axios
                .get(
                    `http://localhost:3001/users/:${userData.ucinetid}/programs`
                )
                .catch((err) => console.log(err));
            setPrograms(res.data);
            console.log(res.data);
        };
        getPrograms();
    }, [userData]);

    const navigate = useNavigate();

    return (
        <div className="pageContent">
            <Typography variant="h1" gutterBottom>
                {userData.firstname}'s Programs
            </Typography>
            {programs && (
                <div>
                    <Grid container columnSpacing={5} rowSpacing={5}>
                        {programs.map((program, index) => {
                            return (
                                <Grid item key={index}>
                                    <ProgramCard
                                        title={program.program_name}
                                        program_id={program.program_id}
                                        linkType={"dashboard"}
                                    ></ProgramCard>
                                </Grid>
                            );
                        })}
                        <Grid item>
                            <Card>
                                <CardActionArea
                                    onClick={() =>
                                        navigate("/createnewprogram")
                                    }
                                    style={{
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        width: "17rem",
                                    }}
                                >
                                    <CardContent>
                                        <Typography
                                            variant="h3"
                                            component="div"
                                        >
                                            + New Program
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            )}
        </div>
    );
};

export default ProgramSelectDashboard;
