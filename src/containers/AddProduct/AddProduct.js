import React from 'react';
import {Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Typography} from "@mui/material";
import ProductForm from "../../components/ProductForm/ProductForm";
import {createProductRequest} from "../../store/actions/productsActions";

const AddProduct = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);
  const error = useSelector(state => state.products.error)

  if (user && user.role !== 'admin') {
    return <Redirect to="/"/>
  }

  const onProductFormSubmit = productData => {
    dispatch(createProductRequest(productData));
  };

  return (
    <>
      <Typography
        textAlign="center"
        marginBottom="20px"
        variant="h4"
      >
        Add new product
      </Typography>
      <ProductForm
        onSubmit={onProductFormSubmit}
        error={error}
      />
    </>
  );
};

export default AddProduct;