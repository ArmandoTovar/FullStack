import {
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import Text from './Text'
import React, { useEffect } from 'react'
import theme from '../theme'
import { useNavigate, useParams } from 'react-router-native'
import { useLazyQuery } from '@apollo/client'
import { ONE_REPOSITORY } from '../graphql/queries'
import * as Linking from 'expo-linking'
export default function RepositoyItem({ item, button = false }) {
  const navigate = useNavigate()
  const onPress = () => {
    navigate(`/repos/${item.id}`)
  }
  return (
    <TouchableOpacity key={item.id} disabled={button} onPress={() => onPress()}>
      <View testID="repositoryItem" style={styles.container}>
        <View style={styles.containerDate}>
          <View>
            <Image style={styles.image} source={{ uri: item.ownerAvatarUrl }} />
          </View>
          <View style={styles.containerDescription}>
            <Text
              style={{ width: '100%' }}
              fontWeight="bold"
              fontSize="subheading"
            >
              {item.fullName}
            </Text>
            <Text style={{ width: '100%' }} color="textSecondary">
              {item.description}
            </Text>

            <Text style={styles.lenguage}>{item.language}</Text>
          </View>
        </View>
        <View style={styles.containerDate}>
          <View style={styles.date}>
            <Text fontWeight="bold" fontSize="subheading">
              {item.stargazersCount > 1000
                ? Math.round(item.stargazersCount / 100) / 10 + 'k'
                : item.stargazersCount}
            </Text>
            <Text color="textSecondary">Start</Text>
          </View>
          <View style={styles.date}>
            <Text fontWeight="bold" fontSize="subheading">
              {item.forksCount > 1000
                ? Math.round(item.forksCount / 100) / 10 + 'k'
                : item.forksCount}
            </Text>
            <Text color="textSecondary">Forks</Text>
          </View>
          <View style={styles.date}>
            <Text fontWeight="bold" fontSize="subheading">
              {item.reviewCount > 1000
                ? Math.round(item.reviewCount / 100) / 10 + 'k'
                : item.reviewCount}
            </Text>
            <Text color="textSecondary">Reviews</Text>
          </View>
          <View style={styles.date}>
            <Text fontWeight="bold" fontSize="subheading">
              {item.ratingAverage > 1000
                ? Math.round(item.ratingAverage / 100) / 10 + 'k'
                : item.ratingAverage}
            </Text>
            <Text color="textSecondary">Rating</Text>
          </View>
        </View>
        {button ? (
          <TouchableWithoutFeedback onPress={() => Linking.openURL(item.url)}>
            <Text style={styles.lenguage}>Open in GitHub</Text>
          </TouchableWithoutFeedback>
        ) : (
          <></>
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  lenguage: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.textThird,
    borderRadius: 5,
    padding: 6,
    marginBottom: 6,
    textAlign: 'center',
  },
  container: {
    display: 'flex',
    margin: 15,
  },
  containerDate: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start',
  },
  date: {
    flexGrow: 1,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 4,
    resizeMode: 'stretch',
  },
  containerDescription: {
    flexGrow: 0,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    marginHorizontal: 20,
  },
})
