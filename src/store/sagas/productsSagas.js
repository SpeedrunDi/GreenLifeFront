import {put, takeEvery} from 'redux-saga/effects'
import Swal from 'sweetalert2'
import axiosApi from '../../axiosApi'

import {
  fetchProductRequest,
  fetchProductSuccess,
  fetchProductFailure,
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  createProductRequest,
  createProductSuccess,
  createProductFailure,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFailure
} from '../actions/productsActions'

const Toast = Swal.mixin({
  toast: true,
  timer: 3000,
  timerProgressBar: true,
  showConfirmButton: false,
  iconColor: "black",
  color: "black",
  background: "lime",
  position: "top-end",
})

export function* fetchProductSaga({payload: id}) {
  try {
    const response = yield axiosApi.get(`/products/${id}`)
    yield put(fetchProductSuccess(response.data))
  } catch (e) {
    yield put(fetchProductFailure())
    yield Toast.fire({
      icon: 'error',
      title: `Что то пошло не так!`,
    })
  }
}

export function* fetchProductsSaga() {
  try {
    const response = yield axiosApi.get(`/products`)
    yield put(fetchProductsSuccess(response.data))
  } catch (e) {
    yield put(fetchProductsFailure())
    yield Toast.fire({
      icon: 'error',
      title: `Что то пошло не так!`,
    })
  }
}

export function* createProductSaga({payload: productData}) {
  try {
    yield axiosApi.post(`/products`, productData)
    yield put(createProductSuccess())
    yield Toast.fire({
      icon: 'success',
      title: `Товар успешно создан!`,
    })
  } catch (e) {
    yield put(createProductFailure())
    yield Toast.fire({
      icon: 'error',
      title: `Что то пошло не так!`,
    })
  }
}

export function* deleteProductSaga({payload: id}) {
  try {
    yield axiosApi.delete(`/products/${id}`)
    yield put(deleteProductSuccess())
    yield Toast.fire({
      icon: 'success',
      title: `Товар успешно удалён!`,
    })
  } catch (e) {
    yield put(deleteProductFailure())
    yield Toast.fire({
      icon: 'error',
      title: `Что то пошло не так!`,
    })
  }
}

const productSagas = [
  takeEvery(fetchProductRequest, fetchProductSaga),
  takeEvery(fetchProductsRequest, fetchProductsSaga),
  takeEvery(createProductRequest, createProductSaga),
  takeEvery(deleteProductRequest, deleteProductSaga)
]

export default productSagas