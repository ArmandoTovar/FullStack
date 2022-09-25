import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import FormNewBlog from './components/FormNewBlog'
import Login from './components/Login'
import Notification from './components/Notification'
import Toggable from './components/Toggable'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user,setUser]= useState(null)
  const [messageError,setMessageError]=useState(null)
  const blogRef = useRef()
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {

    const localdata =window.localStorage.getItem('login')
    const loginTemp = JSON.parse(localdata);
    console.log(loginTemp)
    if (loginTemp )
    {
      setUser(loginTemp)
      blogService.auxiliarToken(loginTemp.token)
    }
  }, [])

  const setError=(message)=>{
    console.log(message)
    setMessageError({msg:message,err:true})
    setTimeout(()=>{setMessageError(null)},3000)
    
  }

  const addBlogs = (blog)=>{
    blogRef.current.toggleVisibility()
    setMessageError({msg:`add new blog '${blog.title}' `,err:false})
    setTimeout(()=>{setMessageError(null)},3000)
    const newBlogs = [...blogs,blog]
    setBlogs( newBlogs )
  }

  const updateBlog = (blog)=>{
    const newBlogs = blogs.map(b=> blog.id===b.id? blog:b)
    setBlogs( newBlogs )
  }


const deleteBlog = (id)=>{
  const newBlogs = blogs.filter(b=> id!==b.id)
  setBlogs( newBlogs )
}

  return (
  <> 
    <Notification message={messageError}/>
  
  { user === null ? 
  <Login setUser={setUser} setError={setError}/> 
  : 
   <div>
   <Toggable ref={blogRef} name="newBlog">
   <FormNewBlog  user={user} setError={setError} addBlogs={addBlogs} />
   </Toggable>
   
  <button onClick={()=>{ setUser(null);window.localStorage.removeItem('login')}}>logout</button>
      <p>welcome {user.user}</p>

      <h2>blogs</h2>
      
      {blogs.sort((a,b)=>{
      if(a.likes>b.likes)
      return -1
      if(a.likes===b.likes)
      return 0
      return 1
      } 
      ).map(blog =>
        <Blog key={blog.id} blog={blog} setError={setError} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />
      )}
    </div>
    
  }

</>
  )
}

export default App
