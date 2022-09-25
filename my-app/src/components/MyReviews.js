import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { ReviewItem } from './SingleRepository'
import { ItemSeparator } from './RepositoryList'
import { useMutation, useQuery } from '@apollo/client'
import { USER_LOGIN } from '../graphql/queries'
import { DELETE_REVIEW } from '../graphql/mutations'

export default function MyReviews() {
  const { data, called, refetch, loading } = useQuery(USER_LOGIN, {
    variables: { includeReviews: true },
  })
  const [DeleteReview] = useMutation(DELETE_REVIEW)
  const reviewDelete = (id) => {
    try {
      DeleteReview({ variables: { deleteReviewId: id } })

      refetch({ includeReviews: true })
    } catch {
      console.log('error al eliminar')
    }
  }
  const nodeReviews =
    !loading && data ? data.me?.reviews?.edges.map((edge) => edge.node) : false

  return (
    <FlatList
      data={nodeReviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem type review={item} reviewDelete={reviewDelete} />
      )}
    />
  )
}
