import React, { useRef } from 'react'
import Blogs from './Blogs'
import FormNewBlog from './FormNewBlog'
import Header from './Header'
import Toggable from './Toggable'

export default function Home() {
  const blogRef = useRef()

  return (
    <div>
      <Header />
      <Toggable ref={blogRef} name="newBlog">
        <FormNewBlog />
      </Toggable>
      <Blogs />
    </div>
  )
}
