import { useLazyQuery, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ALL_BOOK } from './queries'

const Books = (props) => {
  const [filter, setFilter] = useState('')
  const [allBooks, result] = useLazyQuery(ALL_BOOK)
  const [books, setBooks] = useState()
  useEffect(() => {
    console.log('alla')
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result.data])
  useEffect(() => {
    allBooks()
    console.log('aqui')
  }, [])

  if (!props.show) {
    return null
  }

  if (!result.data) {
    return <div>Loading...</div>
  }

  const booksFilter = books.filter(({ genres }) => {
    return filter === '' ? true : genres.includes(filter)
  })
  const itemFilter = new Set(books.map(({ genres }) => genres).flat())
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksFilter.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {[...itemFilter].map((e) => {
        return (
          <button key={e} disabled={e === filter} onClick={() => setFilter(e)}>
            {e}
          </button>
        )
      })}
      <button disabled={filter === ''} onClick={() => setFilter('')}>
        all
      </button>
    </div>
  )
}

export default Books
