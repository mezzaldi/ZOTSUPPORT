import React from "react";
import {
    Grid,
    Typography,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useContext, useEffect } from "react";
import UserContext from "../../user/UserContext";
import axios from "axios";
import { useState } from "react";
import CardCarousel from "../../components/CardCarousel";
import ProgramCard from "../../components/ProgramCard";
import NotificationTable from "../../components/NotificationTable";

const ProgramDashboard = () => {
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
    const handleCardClick = (title) => {
        navigate(`/program/${title}`);
    };

    return (
        <div className="pageContent">
            <Typography variant="h1" gutterBottom>
                {userData.firstname}'s Programs
            </Typography>
            {programs && (
                <div>
                    <Grid container>
                        {programs.map((program, index) => {
                            return (
                                <Grid item key={index}>
                                    <ProgramCard
                                        title={program.program_name}
                                    ></ProgramCard>
                                </Grid>
                            );
                        })}
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Card>
                                <CardActionArea
                                    onClick={() =>
                                        navigate("/CreateNewProgramPage")
                                    }
                                    style={{
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
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

    // useEffect(() => {
    //     console.log("Updated userPrograms: ", userPrograms);
    // }, [userPrograms]);

    // const navigate = useNavigate();

    // // const programs = userPrograms.map( (program) => {

    // // })

    // //  <CardCarousel cardType="program" data={followedPrograms} />

    // const programs = [
    //     {
    //         title: "LARC",
    //         imageUrl:
    //             "https://pbs.twimg.com/profile_images/1100149741004845057/lP63_CLQ_400x400.png",
    //     },
    //     {
    //         title: "Program Name 2",
    //         imageUrl: "/images/placeholder.jpg",
    //     },
    // ];

    // const handleCardClick = (title) => {
    //     navigate(`/program/${title}`);
    // };

    // return (
    //     <div className="pageContent">
    //         <Typography variant="h1" gutterBottom>
    //             {userData.firstname}'s Programs
    //         </Typography>

    //         {/* userPrograms.map((program) => {
    //                 <ProgramCard title={program.program_name}></ProgramCard>;
    //             }) */}

    //         {userPrograms && (
    //             <Grid container spacing={4}>
    //                 {programs.map((program, index) => (
    //                     <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
    //                         <Card>
    //                             <CardActionArea
    //                                 onClick={() =>
    //                                     handleCardClick(program.title)
    //                                 }
    //                             >
    //                                 <CardMedia
    //                                     sx={{ height: 140 }}
    //                                     image={program.imageUrl}
    //                                     title={program.title}
    //                                 />
    //                                 <CardContent>
    //                                     <Typography variant="h5">
    //                                         {program.title}
    //                                     </Typography>
    //                                 </CardContent>
    //                             </CardActionArea>
    //                         </Card>
    //                     </Grid>
    //                 ))}
    //                 <Grid item xs={12} sm={6} md={4} lg={3}>
    //                     <Card>
    //                         <CardActionArea
    //                             onClick={() =>
    //                                 navigate("/CreateNewProgramPage")
    //                             }
    //                             style={{
    //                                 height: "100%",
    //                                 display: "flex",
    //                                 flexDirection: "column",
    //                                 justifyContent: "center",
    //                                 alignItems: "center",
    //                             }}
    //                         >
    //                             <CardContent>
    //                                 <Typography variant="h5" component="div">
    //                                     + New Program
    //                                 </Typography>
    //                             </CardContent>
    //                         </CardActionArea>
    //                     </Card>
    //                 </Grid>
    //             </Grid>
    //         )}
    //     </div>
    // );
};

export default ProgramDashboard;
