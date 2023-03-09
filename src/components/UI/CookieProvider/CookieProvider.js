import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import Cookies from 'js-cookie'
import {loginUserCookiesRequest} from '../../../store/actions/usersActions'

const CookieProvider = ({children}) => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (Cookies.get('greenlife')) {
      dispatch(loginUserCookiesRequest())
    }
  }, [dispatch])

  return <>{children}</>
}

export default CookieProvider
