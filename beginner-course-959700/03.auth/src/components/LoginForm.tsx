import * as React from 'react'
import {
  ComponentEnhancer,
  compose,
  withHandlers,
  withStateHandlers
} from 'recompose'
import firebase from 'firebase'
import { StyleSheet, Text } from 'react-native'
import { Button, Card, CardSection, Input, Spinner } from './common'

interface IState {
  isLoading: boolean
  email: string
  password: string
  errorMessage: string
}

interface IStateHandlers {
  onChangeIsLoading: (value: boolean) => { isLoading: boolean }
  onChangeEmail: (value: string) => { email: string }
  onChangePassword: (value: string) => { password: string }
  onChangeErrorMessage: (value: string) => { errorMessage: string }
  onLoginSuccess: () => IState
  onLoginFail: () => () => {
    isLoading: boolean
    errorMessage: string
  }
}

interface IHandlers {
  onLoginButtonPress: () => () => void
}

interface IProps extends IState, IStateHandlers, IHandlers {}

const LoginForm = ({
  isLoading,
  email,
  password,
  errorMessage,
  onChangeEmail,
  onChangePassword,
  onLoginButtonPress
}: IProps) => {
  const { errorTextStyle } = styles
  return (
    <Card>
      <CardSection>
        <Input
          label="Email"
          value={email}
          placeholder="user@gmail.com"
          onChangeText={onChangeEmail}
        />
      </CardSection>

      <CardSection>
        <Input
          label="Password"
          value={password}
          placeholder="password"
          onChangeText={onChangePassword}
          secureTextEntry
        />
      </CardSection>

      <Text style={errorTextStyle}>{errorMessage}</Text>

      <CardSection>
        {isLoading ? (
          <Spinner size="small" />
        ) : (
          <Button onPress={onLoginButtonPress}>
            <Text>Log in</Text>
          </Button>
        )}
      </CardSection>
    </Card>
  )
}

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
})

const enhancer: ComponentEnhancer<IProps, {}> = compose(
  withStateHandlers(
    {
      isLoading: false,
      email: '',
      password: '',
      errorMessage: ''
    },
    {
      onChangeIsLoading: () => (value: boolean) => ({
        isLoading: value
      }),
      onChangeEmail: () => (value: string) => ({
        email: value
      }),
      onChangePassword: () => (value: string) => ({
        password: value
      }),
      onChangeErrorMessage: () => (value: string) => ({
        errorMessage: value
      }),
      onLoginSuccess: () => () => ({
        isLoading: false,
        email: '',
        password: '',
        errorMessage: ''
      }),
      onLoginFail: () => () => ({
        isLoading: false,
        errorMessage: 'Authentication Failed.'
      })
    }
  ),
  withHandlers({
    onLoginButtonPress: ({
      email,
      password,
      onChangeIsLoading,
      onChangeErrorMessage,
      onLoginSuccess,
      onLoginFail
    }: IState & IStateHandlers) => (): void => {
      startLoading()
      resetErrorMessage()

      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => onLoginSuccess())
        .catch(() => {
          firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => onLoginSuccess())
            .catch(() => onLoginFail())
        })

      function resetErrorMessage() {
        onChangeErrorMessage('')
      }
      function startLoading() {
        onChangeIsLoading(true)
      }
    }
  })
)

export default enhancer(LoginForm)
