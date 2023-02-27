import productsSlice from "../slices/productsSlices";

export const {
  fetchProductRequest,
  fetchProductSuccess,
  fetchProductFailure,
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  createProductRequest,
  createProductSuccess,
  createProductFailure,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFailure
} = productsSlice.actions