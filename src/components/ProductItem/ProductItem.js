import React from 'react';
import {Link} from "react-router-dom";
import {Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton} from "@mui/material";
import {ArrowForward} from "@mui/icons-material";
import imageNotAvailable from '../../assets/image-not-available.jpg';
import {apiUrl} from "../../config";

const ProductItem = ({id, title, price, image}) => {
  let cardImage = imageNotAvailable;

  if (image) {
    cardImage = apiUrl + '/' + image;
  }

  return (
    <Grid item xs={12} sm={6} lg={3}>
      <Card sx={{height: '100%', boxShadow: "6", border: "5px solid rgba(66,227,116,0.7)", borderRadius: "10px"}}>
        <CardHeader title={title}/>
        <CardMedia
          title={title}
          image={cardImage}
          sx={{paddingTop: '56.25%', height: 0}}
        />
        <CardContent>
          <strong>
            Price: {price} KGS
          </strong>
        </CardContent>
        <CardActions>
          <IconButton component={Link} to={'/products/' + id}>
            <ArrowForward />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};
export default ProductItem;