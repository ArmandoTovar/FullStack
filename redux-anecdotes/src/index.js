import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore , combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import App from './App'
import  AnecdoteReducer from './reducers/anecdoteReducer'
import NotificationReducer from './reducers/notificationReducer'
import FilterReducer from './reducers/filterReducer'
const allReducer =  combineReducers({
  anecdote:AnecdoteReducer,
  notification:NotificationReducer,
  filter:FilterReducer
})
const store = createStore(allReducer,composeWithDevTools())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
