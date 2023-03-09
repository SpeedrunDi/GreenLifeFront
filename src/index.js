import React from 'react'
import ReactDOM from 'react-dom/client'
import {Router} from 'react-router-dom'
import {Provider} from "react-redux"
import {ThemeProvider} from "@mui/material";
import App from './App'
import CookieProvider from "./components/UI/CookieProvider/CookieProvider";
import store from './store/configureStore'
import history from './history'
import theme from "./theme";
import './index.css'

const app = (
  <Provider store={store}>
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <CookieProvider>
          <App/>
        </CookieProvider>
      </ThemeProvider>
    </Router>
  </Provider>
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(app)