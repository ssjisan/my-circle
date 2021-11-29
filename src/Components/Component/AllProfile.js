import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cover from "../../Asset/cover.json";
export default function AllProfile() {
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setProfiles(data));
  }, []);

  const [images, setImages] = useState([]);
  const [all,setAll]=useState([])
  useEffect(() => {
    fetch("https://randomuser.me/api/?results=10")
      .then((res) => res.json())
      .then((data) =>
        data.results.map((data) => setImages(data))
      );
  }, []);
  console.log(images);
  
  return (
    <div>
      <Card style={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>
        <Typography
          variant="h4"
          style={{ textAlign: "center", margin: "20px" }}
        >
          My Circle
        </Typography>
        <Grid container spacing={2}>
          {profiles.map((data, index) => (
            <Grid item xs={12} md={3}>
              <Card
                style={{
                  boxShadow: "2px 5px 15px 0px rgba(0,0,0,0.2)",
                  textAlign: "center",
                }}
              >
                <Box
                  style={{ backgroundColor: "#EFEFEF", height: "100px" }}
                ></Box>
                <Avatar
                  style={{
                    width: "100px",
                    height: "100px",
                    margin: "-50px auto",
                  }}
                  src={images.medium}
                />
                <CardContent style={{ marginTop: "50px" }}>
                  <Typography variant="h6">{data.name}</Typography>
                  <Typography variant="button" style={{ color: "#AEB7B6" }}>
                    @{data.username}
                  </Typography>
                  <br />
                  <Typography variant="caption">{data.email}</Typography>
                  <Divider light style={{ margin: "5%" }} />
                  <Link
                    to={"/post/" + data.id}
                    style={{ textDecoration: "none" }}
                  >
                    <Button variant="outlined">View Profile</Button>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Card>
    </div>
  );
}
