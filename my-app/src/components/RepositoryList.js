import React, { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { RepositoryListContainer } from './RepositoryListContainer'
import { useRepositories } from '../hooks/useRepositories'
const RepositoryList = () => {
  const [varfilter, setVarfilter] = useState({})
  const [text, setText] = useState('')
  const [value] = useDebounce(text, 500)
  const { repositories, fetchMore } = useRepositories({
    first: 6,
    searchKeyword: value,
    ...varfilter,
  })

  const onEndReach = () => {
    fetchMore()
  }

  const SetFilter = (value) => {
    switch (value) {
      case 0:
        setVarfilter({
          orderBy: 'CREATED_AT',
          orderDirection: 'DESC',
        })
        break
      case 1:
        setVarfilter({
          orderBy: 'RATING_AVERAGE',
          orderDirection: 'DESC',
        })
        break
      case 2:
        setVarfilter({
          orderBy: 'RATING_AVERAGE',
          orderDirection: 'ASC',
        })
        break

      default:
        setVarfilter({})
        break
    }
  }

  const respositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  return (
    <RepositoryListContainer
      SetFilter={SetFilter}
      text={text}
      setText={setText}
      respositoryNodes={respositoryNodes}
      onEndReached={onEndReach}
    />
  )
}

export default RepositoryList
