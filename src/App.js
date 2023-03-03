import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Typography} from "@mui/material";
import Register from './containers/Register/Register'
import Login from './containers/Login/Login'
import Main from "./containers/Main/Main"
import CookieProvider from './components/UI/CookieProvider/CookieProvider'
import Layout from "./components/UI/Layout/Layout"
import AddProduct from "./containers/AddProduct/AddProduct"
import Basket from "./containers/Basket/Basket";
import Orders from "./containers/Orders/Orders";
import Product from "./containers/Product/Product";

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
          {Cookies.get('greenlife') ? <Route path="/orders" component={Orders}/> : <Redirect to="/"/>}
          <Route path="/products/:id" component={Product}/>
          <Route path="*"
                 render={() => <Typography
                   textTransform="uppercase"
                   textAlign="center"
                   fontSize="48px"
                   marginTop="150px"
                 >
                   Страница не найдена
                 </Typography>}
          />
        </Switch>
      </Layout>
    </CookieProvider>
  )
}

export default App