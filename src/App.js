import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Typography} from "@mui/material"
import {useSelector} from "react-redux"
import Register from './containers/Register/Register'
import Login from './containers/Login/Login'
import Main from "./containers/Main/Main"
import Layout from "./components/UI/Layout/Layout"
import AddProduct from "./containers/AddProduct/AddProduct"
import Basket from "./containers/Basket/Basket"
import OrdersHistory from "./containers/OrdersHistory/OrdersHistory"
import Product from "./containers/Product/Product"

const App = () => {
  const user = useSelector(state => state.users.user)

  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Main}/>
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
        <Route path="/basket" component={Basket}/>
        <Route path="/products/:id" component={Product}/>
        {(Cookies.get('greenlife') || user) && <Route path="/add_product" component={AddProduct}/>}
        {(Cookies.get('greenlife') || user) && <Route path="/orders" component={OrdersHistory}/>}
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
  )
}

export default App