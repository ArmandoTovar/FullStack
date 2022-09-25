import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BlogDetail from './components/BlogDetail'
import Home from './components/Home'
import Login from './components/Login'
import Notification from './components/Notification'
import User from './components/User'
import Users from './components/Users'

import { initialBlogs } from './reducer/blogReducer'
import { initialUser } from './reducer/userReducer'

const App = () => {
  const dispach = useDispatch()
  const user = useSelector((state) => state.userReducer.activeUser)

  useEffect(() => {
    dispach(initialBlogs())
    dispach(initialUser())
  }, [dispach])

  return (
    <div>
      <Notification />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={user !== null ? <Home /> : <Login />} />
          <Route
            path="/users"
            element={user !== null ? <Users /> : <Login />}
          />
          <Route
            path="/users/:id"
            element={user !== null ? <User /> : <Login />}
          />
          <Route
            path="/blogs/:id"
            element={user !== null ? <BlogDetail /> : <Login />}
          />
          <Route path="/login" element={user !== null ? <Home /> : <Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
