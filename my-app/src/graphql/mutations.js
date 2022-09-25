import { gql } from 'apollo-boost'

export const LOGIN = gql`
  mutation Authenticate($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      user {
        username
        id
      }
      accessToken
    }
  }
`

export const NEW_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput) {
    createReview(review: $review) {
      id
      repositoryId
    }
  }
`

export const SINGUP = gql`
  mutation Mutation($user: CreateUserInput) {
    createUser(user: $user) {
      createdAt
    }
  }
`

export const DELETE_REVIEW = gql`
  mutation DeleteReview($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`
