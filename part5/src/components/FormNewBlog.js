import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useInput from '../hooks/useInput'
import { addBlog } from '../reducer/blogReducer'
import { addInfo } from '../reducer/infoReducer'
import blogService from '../services/blogs'
export default function FormNewBlog() {
  const { reset: rtitle, ...title } = useInput('text')
  const { reset: rauthor, ...author } = useInput('text')
  const { reset: rurl, ...url } = useInput('text')
  const dispach = useDispatch()
  const user = useSelector((state) => state.userReducer.activeUser)
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(title.value)
    blogService.auxiliarToken(user.token)
    try {
      await dispach(
        addBlog({ title: title.value, author: author.value, url: url.value })
      )

      rauthor()
      rtitle()
      rurl()
      dispach(addInfo({ msg: `add new blog '${title.value}' `, error: false }))

      setTimeout(() => {
        dispach(addInfo({ msg: null, error: false }))
      }, 3000)
    } catch ({ response }) {
      dispach(addInfo({ msg: response.data.error, error: true }))

      setTimeout(() => {
        dispach(addInfo({ msg: null, error: true }))
      }, 3000)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      title: <input {...title} />
      author: <input {...author} />
      url: <input {...url} />
      <button type="submit">enviar</button>
    </form>
  )
}
