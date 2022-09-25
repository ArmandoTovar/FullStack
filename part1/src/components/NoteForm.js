import React from 'react'
import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/noteReducer'
const NoteForm = () => {
  const dispatch = useDispatch()

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    const Note = {
      content: content,
      important: false,
    }
    dispatch(createNote(Note))
  }

  return (
    <div className='formDiv'>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input name='note' />
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default NoteForm
