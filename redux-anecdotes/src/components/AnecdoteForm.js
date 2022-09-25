import React from 'react'
import {  useDispatch } from 'react-redux'
import { addNote } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'
export default function AnecdoteForm() {
    const dispatch = useDispatch()
    const handleSubmit = (e) =>{
        e.preventDefault();
        const content = e.target.note.value
        e.target.note.value= ""
        dispatch(addNote(content))
        dispatch(setMessage({
         msg: `add new note "${content}"`,
         visible:true})
          )
          setTimeout(() => {
            dispatch(setMessage({
              msg: '',
              visible:false})
               )
          }, 4000);
        
      }
  return (
    <>
    <h2>create new</h2>
    <form onSubmit={handleSubmit}>
    <div><input name='note' /></div>
    <button>create</button>
  </form>
  </>)
}
