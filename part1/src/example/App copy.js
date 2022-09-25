import { useState, useEffect, useRef } from 'react'
import Footer from './components/Footer'

import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'
const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const noteFormRef = useRef()
  const [user,setUser]=useState(null)
  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(() => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      }).catch((e) => console.log(e))
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  },[])

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const handleLogin = async ( { username,password }) => {
    try {
      const user = await loginService.login({
        username,password
      })

      window.localStorage.setItem(
        'loggedNoteappUser',JSON.stringify(user)
      )
      noteService.setToken(user.token)
      setUser(user)
    }
    catch(exception){
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      },5000)
    }
    console.log('logging in with',username,password)
  }
  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }
  const loginForm = () => {

    return (
      <div>
        <Togglable buttonLabel='login'>
          <LoginForm
            handleSubmit={handleLogin}
          />
        </Togglable>
      </div>
    )
  }

  const noteForm = () => (

    <Togglable buttonLabel='new note' ref={noteFormRef}>
      <NoteForm createNote={addNote}  />
    </Togglable>
  )
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {user===null && loginForm()}
      {user !== null && noteForm()}


      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ul>
      <Footer/>
    </div>
  )
}

export default App