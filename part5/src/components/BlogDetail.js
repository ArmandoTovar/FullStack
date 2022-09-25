import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Blog from './Blog'
import Header from './Header'

export default function BlogDetail() {
  const params = useParams()

  const blog = useSelector((state) => {
    return state.blogReducer.filter((blog) => blog.id === params.id)[0]
  })

  console.log(blog)
  return (
    <div>
      <Header />
      {blog ? (
        <>
          <h2>{blog.title}</h2>
          <Blog blog={blog} />
        </>
      ) : (
        <p>id no reconocido</p>
      )}
    </div>
  )
}
