import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Typography
} from "@mui/material";
import {ArrowForward, Delete} from "@mui/icons-material";
import {selectProduct} from "../../store/actions/usersActions";
import {changeStockProductRequest, deleteProductRequest} from "../../store/actions/productsActions";
import {apiUrl} from "../../config";
import imageNotAvailable from '../../assets/image-not-available.jpg';

const ProductItem = ({_id, title, price, image, disabled, stock}) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.users.user)
  let cardImage = imageNotAvailable

  const addProduct = () => {
    dispatch(selectProduct({_id, title, price, image, count: 1}))
  }

  const onStockProduct = () => {
    dispatch(changeStockProductRequest(_id))
  }

  const onDeleteProduct = () => {
    dispatch(deleteProductRequest(_id))
  }

  if (image) {
    cardImage = apiUrl + '/' + image
  }

  return (
    <Grid item xs={12} sm={6} lg={3}>
      <Card sx={{
        height: '100%',
        boxShadow: "6",
        border: "5px solid rgba(66,227,116,0.7)",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column"
      }}>
        <CardHeader title={title} sx={{marginBottom: "auto"}}/>
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
          {user?.role !== 'admin' ? (
            stock ? (
              disabled ?
                <Typography variant="span" fontWeight="700" color="red">
                  Товар в корзине
                </Typography> :
                <Button onClick={addProduct}>
                  В корзину
                </Button>
            ) : (
              <Typography variant="span" fontWeight="700" color="red">
                Нету в наличии
              </Typography>
            )
          ) : (
            <>
              <IconButton onClick={onDeleteProduct}>
                <Delete/>
              </IconButton>
              <Button onClick={onStockProduct} color={stock ? "error" : "success"}>
                {stock ? 'Отключить' : 'Включить'}
              </Button>
            </>
          )
          }
        </CardActions>
      </Card>
    </Grid>
  )
}
export default ProductItem;