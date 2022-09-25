import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { addComment, likeBlog, removeBlog } from '../reducer/blogReducer'
import { addInfo } from '../reducer/infoReducer'
import { Link } from 'react-router-dom'
import useInput from '../hooks/useInput'
const Blog = ({ blog }) => {
  const dispach = useDispatch()
  const { reset: creset, ...comment } = useInput('text')
  const user = useSelector((state) => state.userReducer.activeUser)
  const handleClick = async (blog) => {
    blogService.auxiliarToken(user.token)
    try {
      await dispach(
        likeBlog({
          ...blog,
          likes: blog.likes + 1,
        })
      )
    } catch (e) {
      dispach(addInfo({ msg: e.response.data.error, error: true }))
      setTimeout(() => {
        dispach(addInfo({ msg: null, error: true }))
      }, 3000)
    }
  }
  const handleDelete = async (blog) => {
    if (window.confirm(`remove blog ${blog.title}`)) {
      try {
        await dispach(removeBlog(blog.id))
      } catch (e) {
        dispach(addInfo({ msg: e.response.data.error, error: true }))
        setTimeout(() => {
          dispach(addInfo({ msg: null, error: true }))
        }, 3000)
      }
    }
  }
  return (
    <div className="blog">
      <p>author: {blog.author}</p>
      <p>url: {blog.url}</p>
      <p>
        <span className="likes">{blog.likes}</span>
        <button onClick={() => handleClick(blog)}>likes</button>
      </p>

      <button onClick={() => handleDelete(blog)}>remove</button>
      <p>Comments</p>
      <span>add comment </span>
      <input {...comment} />
      <button
        onClick={() => {
          dispach(addComment({ comment: comment.value, id: blog.id }))
          creset()
        }}
      >
        send
      </button>
      {blog.comments.map((elem) => (
        <li>{elem}</li>
      ))}
    </div>
  )
}

export default Blog
