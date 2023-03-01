import {createSlice} from '@reduxjs/toolkit'

const name = 'users'

export const initialState = {
  user: null,
  basket: [],
  users: null,
  loading: false,
  error: null,
}

const usersSlice = createSlice({
  name,
  initialState,
  reducers: {
    registrationRequest(state) {
      state.loading = true
      state.error = null
    },
    registrationSuccess(state, action) {
      state.loading = false
      state.user = action.payload
    },
    registrationFailure(state, action) {
      state.loading = false
      state.error = action.payload
    },
    loginUserRequest(state) {
      state.loading = true
      state.loginError = null
    },
    loginUserSuccess(state, action) {
      state.loading = false
      state.user = action.payload
    },
    loginUserFailure(state, action) {
      state.loading = false
      state.loginError = action.payload
    },
    logoutUser(state) {
      state.user = null
    },
    deleteUserRequest(state) {
      state.deleteLoading = true
    },
    deleteUserSuccess(state) {
      state.deleteLoading = false
    },
    deleteUserFailure(state, action) {
      state.deleteLoading = false
      state.deleteError = action.payload
    },
    forgotPasswordRequest(state) {
      state.loading = true
      state.forgotPasswordError = null
    },
    forgotPasswordSuccess(state, action) {
      state.loading = false
      state.forgotPasswordError = action.payload
    },
    forgotPasswordFailure(state, action) {
      state.loading = false
      state.forgotPasswordError = action.payload
    },
    resetPasswordRequest(state) {
      state.loading = true
      state.resetPasswordError = null
    },
    resetPasswordSuccess(state, action) {
      state.loading = false
      state.resetPasswordError = action.payload
    },
    resetPasswordFailure(state, action) {
      state.loading = false
      state.resetPasswordError = action.payload
    },
    selectProduct(state, action) {
      state.basket = [...state.basket, action.payload]
    },
    deleteProduct(state, action) {
      state.basket = action.payload
    },
    countProduct(state, action) {
      const basket = action.payload
      let newBasket

      if (basket?.length) {
        newBasket = basket.filter(product => product.count !== 0)
      }

      state.basket = newBasket
    }
  },
})

export default usersSlice
