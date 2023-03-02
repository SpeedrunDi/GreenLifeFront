import {put, takeEvery} from 'redux-saga/effects'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'
import axiosApi from '../../axiosApi'
import {historyPush} from '../actions/historyActions'
import {
  clearBasket,
  deleteUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  loginUserFailure,
  loginUserRequest,
  loginUserSuccess,
  logoutUser,
  registrationFailure,
  registrationRequest,
  registrationSuccess,
} from '../actions/usersActions'

const Toast = Swal.mixin({
  toast: true,
  timer: 3000,
  timerProgressBar: true,
  showConfirmButton: false,
  iconColor: "black",
  color: "black",
  background: "lime",
  position: "bottom-end",
  customClass: {
    loader: "red"
  }
})

export function* registrationUserSaga({payload: userData}) {
  try {
    Cookies.remove('greenlife')
    const response = yield axiosApi.post('/users', userData)
    yield put(registrationSuccess(response.data))
    if (response.data) {
      yield put(historyPush('/login'))
    }
    yield put(clearBasket())
    yield Toast.fire({
      icon: 'success',
      title: `Вы успешно зарегистрировались!`,
    })
  } catch (e) {
    if (e.response && e.response.data) {
      yield put(registrationFailure(e.response.data))
      yield Toast.fire({
        icon: 'error',
        title: 'Что то пошло не так!',
      })
    }
  }
}

export function* loginUserSaga({payload: userData}) {
  try {
    if (!userData) {
      let response = yield axiosApi.post(`/users/sessions`)

      yield put(loginUserSuccess(response.data))
    }
    if (userData) {
      Cookies.remove('greenlife')
      let response = yield axiosApi.post(`/users/sessions`, userData)

      yield put(loginUserSuccess(response.data))

      if (response.data) {
        yield put(historyPush('/'))
      }
    }

    yield put(clearBasket())
    yield Toast.fire({
      icon: 'success',
      title: 'Вы успешно вошли в свой аккаунт',
    })
  } catch (e) {
    if (e.response && e.response.data) {
      yield put(loginUserFailure(e.response.data))
      yield Toast.fire({
        icon: 'error',
        title: 'Введены неверные данные',
      })
    }
  }
}

export function* logoutUserSaga() {
  try {
    yield axiosApi.delete('users/sessions')

    yield put(clearBasket())

    yield put(historyPush('/'))
    yield Cookies.remove('greenlife')
    yield Toast.fire({
      icon: 'info',
      title: 'Вы вышли из своего аккаунта',
    })
  } catch (e) {
  }
}

export function* deleteUserSaga({payload: id}) {
  try {
    yield axiosApi.delete(`users/${id}`)
    yield put(deleteUserSuccess())

    yield Toast.fire({
      icon: 'success',
      title: 'Пользователь успешно удалён!',
    })
  } catch (e) {
    yield put(deleteUserFailure(e))
    yield Toast.fire({
      icon: 'error',
      title: 'Ошибка!',
    })
  }
}

const userSagas = [
  takeEvery(loginUserRequest, loginUserSaga),
  takeEvery(deleteUserRequest, deleteUserSaga),
  takeEvery(registrationRequest, registrationUserSaga),
  takeEvery(logoutUser, logoutUserSaga),
]

export default userSagas
