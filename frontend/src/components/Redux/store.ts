import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';
import { thunk } from 'redux-thunk';

// Aquí estás extendiendo la interfaz Window para incluir __REDUX_DEVTOOLS_EXTENSION_COMPOSE__
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// Aquí estás creando tu tienda Redux con createStore, aplicando el middleware redux-thunk
// y habilitando las herramientas de desarrollo de Redux
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(thunk)) // Aquí necesitas acceder a la función default de thunk
);

export default store;

