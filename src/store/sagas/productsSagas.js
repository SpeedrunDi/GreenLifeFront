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
  deleteProductFailure, changeStockProductSuccess, changeStockProductFailure, changeStockProductRequest
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

export function* createProductSaga({payload}) {
  try {
    const {productData, token} = payload
    yield axiosApi.post(`/products?token=${token}`, productData)
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

export function* changeStockProductSaga({payload}) {
  try {
    const {_id, token} = payload
    yield axiosApi.patch(`/products/${_id}?token=${token}`)
    yield put(changeStockProductSuccess())
    yield put(fetchProductsRequest())
    yield Toast.fire({
      icon: 'success',
      title: `Товар успешно изменён!`,
    })
  } catch (e) {
    yield put(changeStockProductFailure())
    yield Toast.fire({
      icon: 'error',
      title: `Что то пошло не так!`,
    })
  }
}

export function* deleteProductSaga({payload}) {
  try {
    const {_id, token} = payload
    yield axiosApi.delete(`/products/${_id}?token=${token}`)
    yield put(deleteProductSuccess())
    yield put(fetchProductsRequest())
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
  takeEvery(deleteProductRequest, deleteProductSaga),
  takeEvery(changeStockProductRequest, changeStockProductSaga),
]

export default productSagas