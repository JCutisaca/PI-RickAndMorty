import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './components/Redux/store.ts'
import axios from 'axios'
import { BrowserRouter } from 'react-router-dom'

const backend = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backend;


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
