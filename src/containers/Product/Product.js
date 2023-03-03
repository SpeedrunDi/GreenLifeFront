import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Paper,
  Typography
} from "@mui/material";
import {fetchProductRequest} from "../../store/actions/productsActions";
import imageNotAvailable from "../../assets/image-not-available.jpg";
import {apiUrl} from "../../config";

const Product = ({match}) => {
  const dispatch = useDispatch();
  const product = useSelector(state => state.products.product);
  let cardImage = imageNotAvailable

  useEffect(() => {
    dispatch(fetchProductRequest(match.params.id));
  }, [dispatch, match.params.id]);

  if (product?.image) {
    cardImage = apiUrl + '/' + product.image
  }

  return (
    product &&
      <Paper elevation={3} square sx={{padding: "15px", maxWidth: "960px", margin: "0 auto"}}>
        <Typography
          fontSize="36px"
          fontFamily="Life Savers"
          textAlign="center"
        >
          Общая информация продукта
        </Typography>
        <Card sx={{
          height: '100%',
          boxShadow: "6",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          maxWidth: "600px",
          margin: "40px auto"
        }}>
          <CardHeader title={product.title}/>
          <CardMedia
            title={product.title}
            image={cardImage}
            sx={{paddingTop: '56.25%', height: 0}}
          />
          <CardContent>
            <Typography paddingY="10px">
              {product.description}
            </Typography>
            <strong>
              Price: {product.price} KGS
            </strong>
          </CardContent>
        </Card>
      </Paper>
  );
};

export default Product;