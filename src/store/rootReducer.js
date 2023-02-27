import { combineReducers } from 'redux'
import usersSlice from './slices/usersSlices'
import productsSlices from "./slices/productsSlices";

const rootReducer = combineReducers({
  users: usersSlice.reducer,
  products: productsSlices.reducer
})

export default rootReducer
