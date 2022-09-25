import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import Text from './Text'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import FormikTextInput from './FormikTextInput'
import theme from '../theme'

import { useSignIn } from '../hooks/useSignIn'
import AuthStorage from '../utils/authStorage'
import { useNavigate } from 'react-router-native'
import Form from './Form'
import { Formik } from 'formik'
import { useMutation } from '@apollo/client'
import { SINGUP } from '../graphql/mutations'
const validationSchema = yup.object().shape({
  password: yup
    .string()
    .min(5, 'Password min length 5 char')
    .max(50, 'Password max length 50 char')
    .required('Password is require'),
  passwordConfirmation: yup
    .string()
    .label('confirm password')
    .required()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  username: yup
    .string()
    .min(3, 'Name min lenght 3 char')
    .max(30, 'Name max lenght 30')
    .required('Name is required'),
})
export default function SignUp() {
  const [signIn] = useSignIn()

  const navigate = useNavigate()
  const [messageError, setMessageError] = useState(null)
  const [mutate, error, result] = useMutation(SINGUP)

  const onSubmit = async (values, resetForm) => {
    const { username, password } = values
    try {
      await mutate({ variables: { user: { username, password } } })
      await signIn({ username, password })
      navigate('/')
      resetForm()
      setMessageError(null)
    } catch (e) {
      setMessageError(e.toString().replace('Error: ', ''))
    }
  }
  return (
    <View style={styles.containerForm}>
      <Formik
        initialValues={{
          name: '',
          password: '',
          passwordConfirmation: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values, resetForm)
        }}
      >
        {({ handleSubmit }) => {
          return (
            <>
              <FormikTextInput
                style={styles.input}
                name="username"
                placeholder="UserName"
              />
              <FormikTextInput
                style={styles.input}
                name="password"
                placeholder="Password"
                secureTextEntry={true}
              />
              <FormikTextInput
                style={styles.input}
                name="passwordConfirmation"
                placeholder="Password confirmation"
                secureTextEntry={true}
              />
              <TouchableWithoutFeedback onPress={(e) => handleSubmit(e)}>
                <Text
                  fontWeight="bold"
                  fontSize="subheading"
                  style={styles.button}
                >
                  Sign up
                </Text>
              </TouchableWithoutFeedback>
            </>
          )
        }}
      </Formik>
      {messageError !== null ? (
        <Text color="textInvalid">{messageError}</Text>
      ) : (
        <></>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  containerForm: {
    display: 'flex',
    flexDirection: 'column',
    margin: 10,
  },
  input: {
    borderColor: '#aaa',
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    marginVertical: 10,
    padding: 10,
    textAlign: 'center',
    color: theme.colors.textThird,
  },
})
