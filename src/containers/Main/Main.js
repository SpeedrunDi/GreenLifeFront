import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box, CircularProgress, Grid, Typography} from "@mui/material";
import {fetchProductsRequest} from "../../store/actions/productsActions";
import ProductItem from "../../components/ProductItem/ProductItem";

const Main = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.products.loading);
  const products = useSelector(state => state.products.products);
  const basket = useSelector(state => state.users.basket)

  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  return loading ? <Box sx={{textAlign: 'center'}}><CircularProgress/></Box> : (
    <Grid container direction="column" spacing={2}>
      {products?.length !== 0 ? (
        <>
          <Grid item container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h3" fontFamily="Baltica">
                Товары
              </Typography>
            </Grid>
          </Grid>
          <Grid item container spacing={3}>
            {products.map(product => {
              let disabled = false

              if (basket?.length) {
                basket.forEach(item => {
                  if (item._id === product._id) disabled = true
                })
              }

              return (
                <ProductItem
                  key={product._id}
                  _id={product._id}
                  title={product.title}
                  price={product.price}
                  image={product.image}
                  stock={product.stock}
                  disabled={disabled}
                />
              )
            })}
          </Grid>
        </>
      ) : <Typography variant="h3"
                      margin="150px 0"
                      textAlign="center"
                      color="red"
                      sx={{fontSize: {xs: "30px", sm: "48px"}}}
      >Временно нет товаров
      </Typography>
      }
    </Grid>
  );
};

export default Main;