import Toggable from "./Toggable"
import blogService from "../services/blogs"
const Blog = ({blog,setError,updateBlog,user,deleteBlog}) =>
{ 
  
  const handleClick = (blog)=>{
   blogService.auxiliarToken(user.token)
   const newBlog = blogService.updateBlog({...blog,user:user.id,likes:blog.likes+1})
    newBlog.then(response=>updateBlog(response))
    .catch(e=>{
      setError(e.response.data.error)
    })
  }
  const handleDelete = (blog)=>{
    if(window.confirm(`remove blog ${blog.title}`))
    {blogService.auxiliarToken(user.token)
    const newBlog = blogService.deleteBlog(blog.id)
     newBlog.then(response=>deleteBlog(blog.id))
     .catch(e=>{
       setError(e.response.data.error)
     })}
   }
  return (

  
  <div className="blog" style={{border:'solid 1px black',margin:'10px'}}>
    <p>{blog.title} "," {blog.author}</p>
      <Toggable name='view' nameClose="hide">
        <p>{blog.url}</p>
        <p><span className="likes">{blog.likes}</span><button onClick={()=>handleClick(blog)}>likes</button></p>
       
        <button onClick={()=>handleDelete(blog)}>remove</button>
      </Toggable>
  </div>  
)}

export default Blog