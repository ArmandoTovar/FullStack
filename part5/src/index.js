import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import blogReducer from './reducer/blogReducer'
import thunk from 'redux-thunk'
import infoReducer from './reducer/infoReducer'
import userReducer from './reducer/userReducer'
import './index.css'
const rootReducer = combineReducers({
  blogReducer: blogReducer,
  infoReducer: infoReducer,
  userReducer: userReducer,
})
const store = createStore(rootReducer, applyMiddleware(thunk))
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
