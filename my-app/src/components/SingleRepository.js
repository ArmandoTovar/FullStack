import { useLazyQuery } from '@apollo/client'
import { useEffect } from 'react'
import {
  Alert,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { useNavigate, useParams } from 'react-router-native'
import { ONE_REPOSITORY } from '../graphql/queries'
import { useReviews } from '../hooks/useReviews'
import theme from '../theme'
import { ItemSeparator } from './RepositoryListContainer'
import RepositoyItem from './RepositoyItem'
import Text from './Text'
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 5,
    marginVertical: 10,
  },
  rates: {
    flexGrow: 0,
    width: 50,
    height: 50,
    borderRadius: 100,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: theme.colors.primary,
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  allWidth: {
    flexGrow: 1,
    width: '80%',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    width: '46%',
    marginHorizontal: '2%',
    marginVertical: 10,
    padding: 10,
    flexGrow: 0,
    textAlign: 'center',
    color: theme.colors.textThird,
  },
  buttonR: {
    backgroundColor: theme.colors.invalid,
    borderRadius: 4,
    flexGrow: 0,
    marginVertical: 10,
    width: '46%',
    marginHorizontal: '2%',
    padding: 10,
    textAlign: 'center',
    color: theme.colors.textThird,
  },
})

export const ReviewItem = ({ review, type, reviewDelete }) => {
  const navigate = useNavigate()
  const date = new Date(Date.parse(review.createdAt))

  return (
    <View key={review.id} style={styles.container}>
      <Text style={styles.rates} fontWeight="bold">
        {review.rating}
      </Text>

      <View style={styles.allWidth}>
        <Text fontWeight="bold" fontSize="subheading">
          {type ? review.repositoryId : review.user?.username}
        </Text>
        <Text color="textSecondary">
          {date.getDay() + '.' + date.getMonth() + '.' + date.getFullYear()}
        </Text>
        <Text>{review.text}</Text>
      </View>
      {type && (
        <>
          <TouchableWithoutFeedback
            onPress={() => navigate(`/repos/${review.repositoryId}`)}
          >
            <Text fontWeight="bold" fontSize="subheading" style={styles.button}>
              View Repository
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() =>
              Alert.alert(
                'Delete review',
                'Are you sure you want to delete this review?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  { text: 'OK', onPress: () => reviewDelete(review.id) },
                ]
              )
            }
          >
            <Text
              fontWeight="bold"
              fontSize="subheading"
              style={styles.buttonR}
            >
              Delete review
            </Text>
          </TouchableWithoutFeedback>
        </>
      )}
    </View>
  )
}

const SingleRepository = () => {
  const params = useParams()
  const { repository, FetchMore } = useReviews({
    first: 5,
    repositoryId: params.id,
  })
  const onEndReach = () => {
    FetchMore()
  }
  const Reviews =
    params.id && repository
      ? repository.reviews.edges.map((edge) => edge.node)
      : false
  if (!repository) return <></>
  return (
    <FlatList
      data={Reviews}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      renderItem={({ item }) => <ReviewItem review={item} />}
      ListHeaderComponent={() => (
        <View>
          <RepositoyItem item={repository} button />
          <ItemSeparator />
        </View>
      )}
      // ...
    />
  )
}

export default SingleRepository
