import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box, CircularProgress, Grid, Typography} from "@mui/material";
import {fetchProductsRequest} from "../../store/actions/productsActions";
import ProductItem from "../../components/ProductItem/ProductItem";

const Main = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.products.loading);
  const products = useSelector(state => state.products.products);

  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  return loading ? <Box sx={{textAlign: 'center'}}><CircularProgress/></Box> : (
    <Grid container direction="column" spacing={2}>
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" fontFamily="Baltica">
            Товары
          </Typography>
        </Grid>
      </Grid>
      <Grid item container spacing={3}>
        {products.length !== 0 ? products.map(product => (
          <ProductItem
            key={product._id}
            id={product._id}
            title={product.title}
            price={product.price}
            image={product.image}
          />
        )) : <Typography variant="h3" margin="30px 0 0 10%">No products</Typography>}
      </Grid>
    </Grid>
  );
};

export default Main;