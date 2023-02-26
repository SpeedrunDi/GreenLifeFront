import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Register from './containers/Register/Register'
import Login from './containers/Login/Login'
import Main from "./containers/Main/Main";
import CookieProvider from './components/UI/CookieProvider/CookieProvider'
import Layout from "./components/UI/Layout/Layout";
// import VerifyPage from './containers/VerifyPage/VerifyPage'
// import ForgotPasswordPage from './containers/ForgotPasswordPage/ForgotPasswordPage'
// import ResetPasswordPage from './containers/ResetPasswordPage/ResetPasswordPage'

const App = () => {
  const user = useSelector(state => state.users.user)
  const loading = useSelector(state => state.users.loading)

  return (
    <CookieProvider>
      <Layout>
        <Switch>
          <Route path="/" exact component={Main}/>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
          {/*<Route path="/confirm/:confirmationCode" component={VerifyPage}/>*/}
          {/*<Route path="/forgot" component={ForgotPasswordPage}/>*/}
          {/*<Route path="/reset/:hash" component={ResetPasswordPage}/>*/}
        </Switch>
      </Layout>
    </CookieProvider>
  )
}

export default App