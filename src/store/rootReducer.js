import {combineReducers} from 'redux'
import usersSlice from './slices/usersSlices'
import productsSlice from "./slices/productsSlices";
import ordersSlice from "./slices/ordersSlices";

const rootReducer = combineReducers({
  users: usersSlice.reducer,
  products: productsSlice.reducer,
  orders: ordersSlice.reducer
})

export default rootReducer
