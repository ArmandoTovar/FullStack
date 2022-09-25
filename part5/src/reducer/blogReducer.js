import blogService from '../services/blogs'
const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIAL_STATE':
      return action.data
    case 'ADD_BLOG':
      return [...state, action.blog]
    case 'ADD_COMMENT':
      return [...state].map((blog) =>
        blog.id !== action.blog.id ? blog : action.blog
      )
    case 'REMOVE_BLOG':
      return [...state].filter((blog) => blog.id !== action.id)
    case 'LIKES':
      const newBlog = [...state].find((blog) => blog.id === action.id)
      newBlog.likes = newBlog.likes + 1
      return [...state].map((blog) => (blog.id !== action.id ? blog : newBlog))
    default:
      return state
  }
}
export function initialBlogs() {
  return (dispatch) =>
    blogService.getAll().then((blogs) => {
      dispatch({ type: 'INITIAL_STATE', data: blogs })
    })
}
export const addBlog = (blog) => {
  return (dispach) =>
    blogService.addBlog(blog).then((response) => {
      dispach({
        type: 'ADD_BLOG',
        blog: response,
      })
    })
}
export const addComment = (blog) => {
  return (dispach) =>
    blogService.addComment(blog).then((response) => {
      dispach({
        type: 'ADD_COMMENT',
        blog: response,
      })
    })
}

export const removeBlog = (id) => {
  return (dispatch) =>
    blogService.deleteBlog(id).then(() =>
      dispatch({
        type: 'REMOVE_BLOG',
        id: id,
      })
    )
}
export const likeBlog = (data) => {
  return (dispatch) =>
    blogService.updateBlog(data).then((response) =>
      dispatch({
        type: 'LIKES',
        id: response.id,
      })
    )
}

export default blogReducer
