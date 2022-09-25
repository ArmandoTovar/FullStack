import axios from 'axios'
const baseUrl = '/api/blogs'
let token = ''
const auxiliarToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const addBlog = (data) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.post(baseUrl, data, config)
  return request.then((response) => response.data)
}
const addComment = (data) => {
  const request = axios.post(baseUrl.concat('/' + data.id + '/comments'), data)
  return request.then((response) => response.data)
}

const updateBlog = (data) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(baseUrl.concat('/' + data.id), data, config)
  return request.then((response) => response.data)
}

const deleteBlog = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(baseUrl.concat('/' + id), config)
  return request.then((response) => response.data)
}

export default {
  getAll,
  auxiliarToken,
  addBlog,
  addComment,
  updateBlog,
  deleteBlog,
}
