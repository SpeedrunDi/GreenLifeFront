import { all } from 'redux-saga/effects'
import userSagas from './sagas/usersSagas'
import historySagas from './sagas/historySagas'
import history from '../history'
import productSagas from "./sagas/productsSagas";
import orderSagas from "./sagas/ordersSagas";

export default function* rootSagas() {
  yield all([
    ...userSagas,
    ...productSagas,
    ...orderSagas,
    ...historySagas(history),
  ])
}
