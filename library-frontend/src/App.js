import { ApolloClient, useApolloClient, useSubscription } from '@apollo/client'
import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import FormLogin from './components/FormLogin'
import NewBook from './components/NewBook'
import {
  ALL_AUTHOR,
  ALL_BOOK,
  AUTHOR_ADDED,
  BOOK_ADDED,
} from './components/queries'
import Recommend from './components/Recommed'

const App = () => {
  const [page, setPage] = useState('login')
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => set.map((p) => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOK })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOK,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      })
    }
  }
  const updateCacheWithAuthor = (addedAuthor) => {
    const includedIn = (set, object) => set.map((p) => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_AUTHOR })
    console.log('paso1', dataInStore)
    console.log('paso2', dataInStore.allAuthors, addedAuthor)

    if (!includedIn(dataInStore.allAuthors, addedAuthor)) {
      console.log('paso3', {
        allAuthors: dataInStore.allAuthors.concat(addedAuthor),
      })
      client.writeQuery({
        query: ALL_AUTHOR,
        data: { allAuthors: dataInStore.allAuthors.concat(addedAuthor) },
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      console.log(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    },
  })

  useSubscription(AUTHOR_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedAuthor = subscriptionData.data.authorAdded
      console.log(`${addedAuthor.title} added`)
      updateCacheWith(addedAuthor)
    },
  })
  const logout = () => {
    setToken(null)
    client.clearStore()
    localStorage.clear()
    setPage('login')
  }
  useEffect(() => {
    const tempToken = localStorage.getItem('token')
    if (token === null && tempToken) {
      setToken(tempToken)
      setPage('authors')
    }
  }, [])
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>

        {token === null ? (
          <button onClick={() => setPage('login')}>login</button>
        ) : (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>

            <button onClick={logout}>logout</button>
          </>
        )}
      </div>

      <Authors
        updateCacheWithAuthor={updateCacheWithAuthor}
        show={page === 'authors'}
      />

      <Books show={page === 'books'} />

      <NewBook updateCacheWith={updateCacheWith} show={page === 'add'} />
      <FormLogin
        setLogin={setToken}
        setPage={setPage}
        show={page === 'login'}
      />
      <Recommend show={page === 'recommend'} />
    </div>
  )
}

export default App
