import {put, takeEvery} from 'redux-saga/effects'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'
import axiosApi from '../../axiosApi'
import {historyPush} from '../actions/historyActions'
import {
  clearBasket,
  loginUserCookiesFailure, loginUserCookiesRequest, loginUserCookiesSuccess,
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
    Cookies.set('greenlife', response.data?.token, {expires: 60, secure: true})
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

export function* loginUserCookiesSaga() {
  try {
    const response = yield axiosApi.post(`/users/sessions/cookies?token=${Cookies.get('greenlife')}`)

    yield put(loginUserCookiesSuccess(response.data))
  } catch (e) {
    yield put(loginUserCookiesFailure())
  }
}

export function* loginUserSaga({payload: userData}) {
  try {
    Cookies.remove('greenlife')
    let response = yield axiosApi.post(`/users/sessions`, userData)
    yield put(loginUserSuccess(response.data))

    if (userData.remember) {
      Cookies.set('greenlife', response.data?.token, {expires: 60, secure: true, sameSite: "none"})
    }
    yield put(historyPush('/'))

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

export function* logoutUserSaga({payload: token}) {
  try {
    yield axiosApi.delete(`users/sessions?token=${token}`)

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

const userSagas = [
  takeEvery(loginUserRequest, loginUserSaga),
  takeEvery(loginUserCookiesRequest, loginUserCookiesSaga),
  takeEvery(registrationRequest, registrationUserSaga),
  takeEvery(logoutUser, logoutUserSaga),
]

export default userSagas
