import { SafeAreaView, StyleSheet, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppBar from './AppBar'
import RepositoryList from './RepositoryList'
import { Route, Routes, useParams } from 'react-router-native'
import theme from '../theme'
import SignIn from './SignIn'

import AuthStorage from '../utils/authStorage'
import RepositoyItem from './RepositoyItem'
import { useLazyQuery } from '@apollo/client'
import { ONE_REPOSITORY } from '../graphql/queries'
import SingleRepository from './SingleRepository'
import CreateReview from './CreateReview'
import SignUp from './SignUp'
import MyReviews from './MyReviews'
const Main = () => {
  const [user, setUser] = useState(null)
  const SetUser = (data) => {
    if (data !== undefined) setUser(data.authenticate.user.username)
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppBar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" exact element={<RepositoryList />} />
        <Route path="/repos/:id" element={<SingleRepository />} />
        <Route path="/SingIn" element={<SignIn SetUser={SetUser} />} />
        <Route path="/signup" element={<SignUp SetUser={SetUser} />} />
        <Route path="/create" element={<CreateReview />} />
        <Route path="/myreviews" element={<MyReviews />} />
      </Routes>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
})

export default Main
