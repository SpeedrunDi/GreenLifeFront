import usersSlice from '../slices/usersSlices'

export const {
  registrationRequest,
  registrationSuccess,
  registrationFailure,
  logoutUser,
  loginUserRequest,
  loginUserSuccess,
  loginUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
  selectProduct,
  deleteProduct,
  countProduct,
  clearBasket
} = usersSlice.actions
