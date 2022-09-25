import { gql } from '@apollo/client'

export const fragmentReviews = gql`
  fragment fragmentReviews on Repository {
    reviews(first: $first, after: $after) {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`
export const fragmentRepository = gql`
  fragment fragmentRepository on Repository {
    fullName
    id
    ownerName
    name
    reviewCount
    forksCount
    language
    description
    ownerAvatarUrl
    stargazersCount
    ratingAverage
    url
  }
`
