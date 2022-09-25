import userService from '../services/users'
import blogService from '../services/blogs'
import { login } from '../services/login'
const initialUsers = {
  activeUser: null,
  users: [],
}
const userReducer = (state = initialUsers, action) => {
  switch (action.type) {
    case 'INITIAL_USER':
      return { ...state, activeUser: action.data }
    case 'GET_USERS':
      return { ...state, users: action.data }
    default:
      return state
  }
}
export const initialUser = () => {
  const localdata = window.localStorage.getItem('login')
  const loginTemp = JSON.parse(localdata)
  console.log(loginTemp)
  if (loginTemp) {
    blogService.auxiliarToken(loginTemp.token)
    return { type: 'INITIAL_USER', data: loginTemp }
  } else {
    return { type: 'INITIAL_USER', data: null }
  }
}
export const getUsers = () => {
  return (dispatch) =>
    userService.getAll().then((users) => {
      dispatch({ type: 'GET_USERS', data: users })
    })
}

export function setUser({ username, password }) {
  return (dispatch) =>
    login({ user: username, password }).then((response) => {
      dispatch({ type: 'INITIAL_USER', data: response })
      window.localStorage.setItem('login', JSON.stringify(response))
    })
}
export default userReducer
