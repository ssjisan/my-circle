import {
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    Typography
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export default function AllPost() {
  const { id } = useParams();
  console.log("at post", id);
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
        const profilePost = data.filter((data) => data.userId === +id);
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
          style={{ textAlign: "center", margin: "40px"}}
        >
          Posts
        </Typography>
        <Grid container spacing={2}>
          {posts.map((data, index) => (
            <Grid item xs={12} md={12} style={{ marginBottom: "20px" }}>
              <Typography variant="h6">{data.title}</Typography>
              <Box style={{display:"flex", justifyContent: "space-between", alignItems: "center"}}><Typography variant="caption" style={{ color: "#AEB7B6" }}>
                      {comments.length} Comments
              </Typography>
              <Link
                to={"/comment/" + data.id}
                style={{ textDecoration: "none" }}
              >
                <Button>Post Details</Button>
              </Link></Box>
              <Divider light />
            </Grid>
          ))}
        </Grid>
      </Card>
    </div>
  );
}
