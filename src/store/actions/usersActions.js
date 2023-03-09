import usersSlice from '../slices/usersSlices'

export const {
  registrationRequest,
  registrationSuccess,
  registrationFailure,
  logoutUser,
  loginUserCookiesRequest,
  loginUserCookiesSuccess,
  loginUserCookiesFailure,
  loginUserRequest,
  loginUserSuccess,
  loginUserFailure,
  selectProduct,
  deleteProduct,
  countProduct,
  clearBasket
} = usersSlice.actions
