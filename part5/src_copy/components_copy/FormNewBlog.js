import React, { useState } from 'react'
import blogService from '../services/blogs'
export default function FormNewBlog({user,setError,addBlogs}) {

    const [title,setTitle]=useState('')
    const [author,setAuthor]=useState('')
    const [url,setUrl]=useState('')

    const handleSubmit = (e)=>{
        e.preventDefault()
       
        blogService.auxiliarToken(user.token)
        blogService.addBlog({title,author,url,user:user.id}).then(
            (response)=>{
             
             
                addBlogs(response)
                setTitle("")
                setAuthor("")
                setUrl("")

            }
        ).catch(e=> setError(e))
    }
  return (
    <form onSubmit={(handleSubmit)}>
        <input type='text' placeholder='title' value={title} onChange={({target})=>setTitle(target.value)}></input>
        <input type='text' placeholder='author' value={author} onChange={({target})=>setAuthor(target.value)}></input>
        <input type='text' placeholder='url' value={url} onChange={({target})=>setUrl(target.value)}></input>
        <button type='submit'>enviar</button>
     </form>
  )
}
