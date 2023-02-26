import {put, takeEvery} from 'redux-saga/effects'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'
import axiosApi from '../../axiosApi'
import {historyPush} from '../actions/historyActions'
import {
  deleteUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  forgotPasswordFailure,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  loginUserFailure,
  loginUserRequest,
  loginUserSuccess,
  logoutUser,
  registrationFailure,
  registrationRequest,
  registrationSuccess,
  resetPasswordFailure,
  resetPasswordRequest,
  resetPasswordSuccess,
  verifyUserFailure,
  verifyUserRequest,
  verifyUserSuccess,
} from '../actions/usersActions'

const Toast = Swal.mixin({
  toast: true,
  timer: 3000,
  timerProgressBar: true,
  showConfirmButton: false,
  iconColor: "black",
  color: "black",
  background: "lime"
})

export function* registrationUserSaga({payload: userData}) {
  try {
    const response = yield axiosApi.post('/users', userData)
    yield put(registrationSuccess(response.data))
    yield Swal.fire({
      toast: false,
      icon: 'success',
      title: `На почту ${response.data.email} отправлено подтверждение`,
    })
  } catch (e) {
    if (e.response && e.response.data) {
      yield put(registrationFailure(e.response.data))
      yield Toast.fire({
        icon: 'error',
        title: 'Данный пользователь уже зарегистрирован',
      })
    }
  }
}

export function* loginUserSaga({payload: userData}) {
  try {
    let response
    if (!userData) {
      response = yield axiosApi.post(`/users/sessions`)
    }
    if (userData) {
      Cookies.remove('greenlife')
      response = yield axiosApi.post(`/users/sessions`, userData)

      if (response.data) {
        yield put(historyPush('/'))
      }
    }
    yield put(loginUserSuccess(response.data))
    yield Toast.fire({
      position: "top-end",
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

    yield put(historyPush('/'))
    yield Cookies.remove('jwt')
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

export function* verifyUserSaga(confirmationCode) {
  try {
    const response = yield axiosApi.get(`/users/confirm/${confirmationCode.payload}`)
    yield put(verifyUserSuccess(response.data))
  } catch (e) {
    yield put(verifyUserFailure(e))
  }
}

export function* forgotPasswordSaga({payload: userData}) {
  try {
    const response = yield axiosApi.post('/users/forgot', userData)
    yield put(forgotPasswordSuccess(response.data))
    yield Toast.fire({
      icon: 'info',
      title: response.data.message,
    })
  } catch (e) {
    yield put(forgotPasswordFailure(e))
  }
}

export function* resetPasswordSaga({payload: hash}) {
  try {
    const response = yield axiosApi.post(`/users/reset/`, {hash})
    yield put(resetPasswordSuccess(response.data))
    yield Toast.fire({
      icon: 'success',
      title: 'Пароль успешно сменён',
    })
  } catch (e) {
    yield put(resetPasswordFailure(e))
  }
}

// export function* editUserPasswordSaga({payload: passwords}) {
//   try {
//     yield axiosApi.put('/users/edit_password', {password: passwords.password, newPassword: passwords.newPassword})
//     yield put(passwordSuccess())
//     yield put(hideLoading())
//     yield Toast.fire({
//       icon: 'success',
//       title: 'Пароль успешно изменен',
//     })
//   } catch (e) {
//     if (e.response && e.response.data) {
//       yield put(passwordFailure(e.response.data))
//       yield Toast.fire({
//         icon: 'error',
//         title: e.response.data.error,
//       })
//     }
//     yield put(hideLoading())
//   }
// }

const userSagas = [
  takeEvery(loginUserRequest, loginUserSaga),
  takeEvery(deleteUserRequest, deleteUserSaga),
  takeEvery(registrationRequest, registrationUserSaga),
  takeEvery(logoutUser, logoutUserSaga),
  takeEvery(verifyUserRequest, verifyUserSaga),
  takeEvery(forgotPasswordRequest, forgotPasswordSaga),
  takeEvery(resetPasswordRequest, resetPasswordSaga),
]

export default userSagas
