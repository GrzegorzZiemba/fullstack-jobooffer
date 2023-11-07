import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import DeleteData from "./DeleteData";

// Update Material-UI core imports to MUI version 5
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { LinkContainer } from "react-router-bootstrap";



const ShowOffers = ({ image, id, workplace, position, iden }) => {

  return (
        <Card style={{width: 345,
            margin: 20,}}>
			<LinkContainer to={`/offer/someID`}>
				<CardActionArea>
					<CardMedia
						style={{height: 140}}
						image={image}
						onError='tocreate'
						title='title'
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							
								"Work offer is disabled, due to expiriation date"
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
							{position}
						</Typography>
					</CardContent>
				</CardActionArea>
			</LinkContainer>
			{/* {uid === iden && uid !== "" ? (
				<CardActions>
					{activeTill > today ? (
						<Link to={`/edit/${id}`}>
							<Button size="small" color="primary">
								Edit
							</Button>
						</Link>
					) : (
						<Button size="small" color="primary" disabled>
							Edit
						</Button>
					)}

					<DeleteData id={id} className="button" />
				</CardActions>
			) : (
				<div>{console.log(uid, iden)}</div>
			)} */}
		</Card>
  )
}

export default ShowOffers