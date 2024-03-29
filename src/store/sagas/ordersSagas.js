import axiosApi from "../../axiosApi";
import Swal from "sweetalert2";
import {put, takeEvery} from 'redux-saga/effects';
import {
  createOrderFailure,
  createOrderRequest,
  createOrderSuccess,
  getOrdersFailure,
  getOrdersRequest,
  getOrdersSuccess, updateStatusFailure, updateStatusRequest, updateStatusSuccess
} from "../actions/ordersActions";
import {clearBasket} from "../actions/usersActions";

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

export function* getOrdersSaga({payload}) {
  try {
    const {token, status} = payload

    const response = yield axiosApi.get(`/orders?token=${token}&status=${status}`)
    yield put(getOrdersSuccess(response.data))
  } catch (e) {
    yield put(getOrdersFailure())
    yield Toast.fire({
      icon: 'error',
      title: `Что то пошло не так!`,
    })
  }
}

export function* createOrderSaga({payload: orderData}) {
  try {
    yield axiosApi.post(`/orders`, orderData)
    yield put(createOrderSuccess())
    yield put(clearBasket())
    yield Toast.fire({
      toast: false,
      icon: 'success',
      title: `Заказ успешно отправлен!`,
      position: "center",
      showConfirmButton: true,
      timer: 120000,
      confirmButtonText: "Закрыть"
    })
  } catch (e) {
    yield put(createOrderFailure())
    yield Toast.fire({
      icon: 'error',
      title: `Что то пошло не так!`,
    })
  }
}

export function* updateStatusSaga({payload}) {
  try {
    const {id, orderStatus, token} = payload
    yield axiosApi.patch(`/orders/${id}?token=${token}&status=${orderStatus}`)

    yield put(updateStatusSuccess())
  } catch (e) {
    yield put(updateStatusFailure())
  }
}

const orderSagas = [
  takeEvery(getOrdersRequest, getOrdersSaga),
  takeEvery(createOrderRequest, createOrderSaga),
  takeEvery(updateStatusRequest, updateStatusSaga),
]

export default orderSagas