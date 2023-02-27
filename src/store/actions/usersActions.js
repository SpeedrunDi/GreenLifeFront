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
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure,
} = usersSlice.actions
