import { gql } from '@apollo/client'
import { fragmentRepository, fragmentReviews } from './fragments'

export const ALL_REPOSITORIES = gql`
  ${fragmentRepository}
  query Query(
    $after: String
    $first: Int
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
    $searchKeyword: String
  ) {
    repositories(
      after: $after
      first: $first
      orderDirection: $orderDirection
      orderBy: $orderBy
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          ...fragmentRepository
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

export const ONE_REPOSITORY = gql`
  ${fragmentRepository}
  ${fragmentReviews}
  query Reviews($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      ...fragmentRepository
      ...fragmentReviews
    }
  }
`

export const USER_LOGIN = gql`
  query Query($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`
