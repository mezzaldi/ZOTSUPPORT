import { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";

const AboutUsPage = () => {
  const [data, setData] = useState();
  const getStudents = async () => {
    const res = await axios
      .get(`http://localhost:3001/test`)
      .catch((err) => console.log(err));
    setData(res.data);
  };

  // data from database in data
  console.log(data);

  return (
    <div class="pageContent">
      <h1>About us</h1>

      <Button onClick={getStudents}>get students</Button>
    </div>
  );
};

export default AboutUsPage;
