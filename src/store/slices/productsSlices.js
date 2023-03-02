import {createSlice} from "@reduxjs/toolkit";

const name = 'products'

export const initialState = {
  products: [],
  product: null,
  loading: false
}

const productsSlice = createSlice({
  name,
  initialState,
  reducers: {
    fetchProductRequest(state) {
      state.loading = true
    },
    fetchProductSuccess(state, action) {
      state.loading = false
      state.product = action.payload
    },
    fetchProductFailure(state) {
      state.loading = false
    },
    fetchProductsRequest(state) {
      state.loading = true
    },
    fetchProductsSuccess(state, action) {
      state.loading = false
      state.products = action.payload
    },
    fetchProductsFailure(state) {
      state.loading = false
    },
    createProductRequest(state) {
      state.loading = true
    },
    createProductSuccess(state) {
      state.loading = false
    },
    createProductFailure(state) {
      state.loading = false
    },
    changeStockProductRequest(state) {
      state.loading = true
    },
    changeStockProductSuccess(state) {
      state.loading = false
    },
    changeStockProductFailure(state) {
      state.loading = false
    },
    deleteProductRequest(state) {
      state.loading = true
    },
    deleteProductSuccess(state) {
      state.loading = false
    },
    deleteProductFailure(state) {
      state.loading = false
    },
  },
})

export default productsSlice