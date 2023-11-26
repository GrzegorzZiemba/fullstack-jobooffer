import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDeleteJobMutation } from "../slices/jobApiSlice";
// Update Material-UI core imports to MUI version 5
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { LinkContainer } from "react-router-bootstrap";

const ShowOffers = ({ image, id, position, author }) => {
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const [deleteApiCall] = useDeleteJobMutation();
  const deleteHandler = async () => {
    try {
      await deleteApiCall(id).unwrap();
      navigate("/");
    } catch (error) {}
  };
  return (
    <Card style={{ width: 345, margin: 20 }}>
      <LinkContainer to={`/offer/${id}`}>
        <CardActionArea>
          <CardMedia style={{ height: 140 }} image={image} title="title" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {position}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {position}
            </Typography>
          </CardContent>
        </CardActionArea>
      </LinkContainer>
      {userInfo?.user ? (
        userInfo?.user === author ? (
          <CardActions>
            <div>
              <Button variant="danger" onClick={deleteHandler}>
                Delete
              </Button>

              <LinkContainer to={`/edit/${id}`}>
                <Button variant="primary">Edit</Button>
              </LinkContainer>
            </div>
          </CardActions>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
    </Card>
  );
};

export default ShowOffers;
