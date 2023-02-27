import { all } from 'redux-saga/effects'
import userSagas from './sagas/usersSagas'
import historySagas from './sagas/historySagas'
import history from '../history'
import productSagas from "./sagas/productsSagas";

export default function* rootSagas() {
  yield all([
    ...userSagas,
    ...productSagas,
    ...historySagas(history),
  ])
}
