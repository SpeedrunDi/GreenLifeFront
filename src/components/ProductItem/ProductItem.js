import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton} from "@mui/material";
import {ArrowForward} from "@mui/icons-material";
import {selectProduct} from "../../store/actions/usersActions";
import {apiUrl} from "../../config";
import imageNotAvailable from '../../assets/image-not-available.jpg';

const ProductItem = ({_id, title, price, image}) => {
  const dispatch = useDispatch()
  let cardImage = imageNotAvailable

  const addProduct = () => {
    dispatch(selectProduct({_id, title, price, image, count: 1}))
  }

  if (image) {
    cardImage = apiUrl + '/' + image
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
        <CardActions sx={{justifyContent: "space-between", paddingX: "20px"}}>
          <IconButton component={Link} to={'/products/' + _id}>
            <ArrowForward/>
          </IconButton>
          <Button onClick={addProduct}>
            В корзину
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}
export default ProductItem;