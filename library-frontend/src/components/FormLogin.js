import { useMutation } from '@apollo/client'
import React, { useEffect } from 'react'
import { useInput } from '../hooks/useInput'
import { LOGIN } from './queries'

function FormLogin({ setLogin, show, setPage }) {
  const { reset: ureset, ...username } = useInput('text')
  const { reset: preset, ...password } = useInput('password')
  const [Login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    },
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    Login({
      variables: {
        username: username.value,
        password: password.value,
      },
    })
    preset()
    ureset()
  }
  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setLogin(token)
      setPage('authors')
      localStorage.setItem('token', token)
    }
  }, [result.data])

  if (!show) {
    return null
  }
  return (
    <form onSubmit={handleSubmit}>
      username:
      <input {...username} />
      password:
      <input {...password} />
      <button>accept</button>
    </form>
  )
}

export default FormLogin
