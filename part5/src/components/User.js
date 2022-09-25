import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Header from './Header'

export default function User() {
  const params = useParams()
  const blogs = useSelector((state) => {
    return state.blogReducer
      .sort((a, b) => {
        if (a.likes > b.likes) return -1
        if (a.likes === b.likes) return 0
        return 1
      })
      .filter((blog) => {
        console.log(blog.user[0].id === params.id)
        return blog.user[0].id === params.id
      })
  })
  console.log(params.id)
  return (
    <div className="mt-20">
      <Header />
      <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
        added Blogs
      </h2>
      <ul className="space-y-1 max-w-md list-disc list-inside text-gray-500 dark:text-gray-400">
        {blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}
