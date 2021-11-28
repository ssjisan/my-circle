import {
    Card,
    CardContent,
    Divider,
    Grid,
    Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function AllComments() {
  const { id } = useParams();
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        const singleProfile = data.filter((data) => data.id === +id);
        setProfiles(singleProfile);
      });
  }, []);

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/")
      .then((res) => res.json())
      .then((data) => {
        const profilePost = data.filter((data) => data.id === +id);
        setPosts(profilePost);
      });
  }, []);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => res.json())
      .then((data) => {
        const comment = data.filter((data) => data.postId === +id);
        setComments(comment);
      });
  }, []);

  const handleProfile = (id) => {
    console.log("from Profile", id);
  };
  return (
    <div>
      <Card style={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>
        <Typography
          variant="h4"
          style={{ textAlign: "center", margin: "20px" }}
        >
          Profile
        </Typography>
        <Grid
          container
          spacing={2}
          style={{ marginBottom: "20px" }}
          justifyContent="center"
        >
          {profiles.map((data, index) => (
            <Grid item xs={6} md={3}>
              <Card
                style={{
                  borderRadius: "12px",
                  boxShadow: "2px 5px 15px 0px rgba(0,0,0,0.2)",
                }}
              >
                <CardContent>
                  <Typography variant="h6">{data.name}</Typography>
                  <Typography variant="button" style={{ color: "#AEB7B6" }}>
                    @{data.username}
                  </Typography>
                  <br />
                  <Typography variant="caption">{data.email}</Typography>
                  <br />
                  <Typography variant="caption">{data.phone}</Typography>
                  <br />
                  <Typography variant="caption">
                    {data.address.street},{data.address.city}{" "}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Typography
          variant="h6"
          style={{ textAlign: "center", margin: "40px" }}
        >
          Posts
        </Typography>
        <Grid container spacing={2}>
          {posts.map((data, index) => (
            <Grid item xs={12} md={12} style={{ marginBottom: "20px" }}>
              <Typography variant="h6">{data.title}</Typography>
              <Typography variant="caption" style={{ color: "#AEB7B6" }}>
                {comments.length} Comments
              </Typography>

              <Divider light />
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={2} style={{ padding: "25px" }}>
          {comments.map((data, index) => (
            <Grid item xs={6} md={12}>
              <Typography variant="caption" style={{ color: "#AEB7B6" }}>
                {data.email}
              </Typography>
              <Typography variant="h6">{data.name}</Typography>
              <Divider />
            </Grid>
          ))}
        </Grid>
      </Card>
    </div>
  );
}
