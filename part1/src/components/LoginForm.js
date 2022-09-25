import React, { useState } from 'react'
import PropTypes from 'prop-types'
const LoginForm = ({ handleSubmit }) => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      <h2>Login</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit({ username, password })
        }}
      >
        <div>
          username
          <input
            id='username'
            value={username}
            onChange={({ target }) => setUserName(target.value)}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-button' type='submit'>
          login
        </button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}
export default LoginForm
