import { useMutation } from '@apollo/client'
import React, { useEffect } from 'react'
import { useInput } from '../hooks/useInput'
import { ALL_AUTHOR, EDIT_AUTHOR } from './queries'

export default function FormBirthyear({ authors, updateCacheWithAuthor }) {
  const [editAuthor, result] = useMutation(EDIT_AUTHOR, {
    onError: (e) => {
      console.log(e)
    },
    update: (store, response) => {
      updateCacheWithAuthor(response.data.editAuthor)
    },
  })

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      console.log('nulo')
    }
  }, [result.data])
  const { reset: breset, ...born } = useInput('number')

  function handleSubmit(e) {
    e.preventDefault()
    editAuthor({
      variables: {
        name: e.target.name.value,
        born: Number(born.value),
      },
    })
    breset()
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        name:{' '}
        <select name="name">
          {authors.map(({ name, id }) => (
            <option key={id} value={name}>
              {name}
            </option>
          ))}
        </select>
        born: <input {...born} />
        <button>send</button>
      </form>
    </div>
  )
}
