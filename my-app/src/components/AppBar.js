import React, { useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native'
import Constants from 'expo-constants'
import Text from './Text'
import AppBarTap from './AppBarTap'
import AuthStorage from '../utils/authStorage'
import useAuthStorage from '../hooks/useAuthStorage'
import { useApolloClient, useQuery } from '@apollo/client'
import { USER_LOGIN } from '../graphql/queries'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 0,
    paddingVertical: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
})

const AppBar = ({ user, setUser }) => {
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()

  const { loading, data } = useQuery(USER_LOGIN)
  if (loading) return <></>
  return (
    <ScrollView horizontal style={styles.container}>
      <AppBarTap name="Repositories" to="/" />
      {!data.me ? <AppBarTap name="Sign Up" to="/signup" /> : <></>}
      {data.me ? <AppBarTap name="Create Reviews" to="/create" /> : <></>}
      {data.me ? <AppBarTap name="my Reviews" to="/myreviews" /> : <></>}

      <Text color="textThird">{user !== null ? `welcome:${user}` : ''}</Text>
      {data.me ? (
        <TouchableWithoutFeedback
          onPress={async () => {
            await authStorage.removeAccessToken()
            setUser(null)
            console.log('eliminado')
            apolloClient.resetStore()
          }}
        >
          <Text fontWeight="bold" style={{ marginLeft: 10 }} color="textThird">
            logout {data?.me?.username}
          </Text>
        </TouchableWithoutFeedback>
      ) : (
        <AppBarTap name="SingIn" to="/SingIn" />
      )}
    </ScrollView>
  )
}

export default AppBar
