import {createSlice} from "@reduxjs/toolkit";

const name = 'orders'

export const initialState = {
  orders: [],
  product: null,
  loading: false
}

const productsSlice = createSlice({
  name,
  initialState,
  reducers: {
    createOrderRequest(state) {
      state.loading = true
    },
    createOrderSuccess(state) {
      state.loading = false
    },
    createOrderFailure(state) {
      state.loading = false
    },
    getOrdersRequest(state) {
      state.loading = true
    },
    getOrdersSuccess(state, action) {
      state.loading = false
      state.orders = action.payload
    },
    getOrdersFailure(state) {
      state.loading = false
    },
  }
})

export default productsSlice