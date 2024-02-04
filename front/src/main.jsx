import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import store from './components/Redux/store'
import { Provider } from 'react-redux'
import axios from 'axios'

// axios.defaults.baseURL = 'http://localhost:3001'
const backend = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backend;

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
  <App />
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
