import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import Cookies from 'js-cookie'
import Register from './containers/Register/Register'
import Login from './containers/Login/Login'
import Main from "./containers/Main/Main"
import CookieProvider from './components/UI/CookieProvider/CookieProvider'
import Layout from "./components/UI/Layout/Layout"
import AddProduct from "./containers/AddProduct/AddProduct"
import Basket from "./containers/Basket/Basket";
// import ForgotPasswordPage from './containers/ForgotPasswordPage/ForgotPasswordPage'
// import ResetPasswordPage from './containers/ResetPasswordPage/ResetPasswordPage'

const App = () => {
  return (
    <CookieProvider>
      <Layout>
        <Switch>
          <Route path="/" exact component={Main}/>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
          <Route path="/basket" component={Basket}/>
          {Cookies.get('greenlife') ? <Route path="/add_product" component={AddProduct}/> : <Redirect to="/"/>}
          {/*<Route path="/forgot" component={ForgotPasswordPage}/>*/}
          {/*<Route path="/reset/:hash" component={ResetPasswordPage}/>*/}
        </Switch>
      </Layout>
    </CookieProvider>
  )
}

export default App