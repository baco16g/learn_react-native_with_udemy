import * as React from 'react'
import firebase from 'firebase'
import {
  ComponentEnhancer,
  compose,
  lifecycle,
  withStateHandlers,
  withHandlers
} from 'recompose'
import { View, Text } from 'react-native'
import { Header, Button, Spinner } from './components/common'
import LoginForm from './components/LoginForm'
import { firebaseConfig } from './config/firebase'

interface IState {
  loggedIn: boolean
  initialRequested: boolean
}

interface IStateHandlers {
  onLogin: () => { loggedIn: true }
  onLogout: () => { loggedIn: false }
  onInitialRequest: () => { initialRequested: true }
}

interface IHandlers {
  onLogoutButtonPress: () => void
}

interface IProps extends IState, IStateHandlers, IHandlers {}

const App = ({ loggedIn, initialRequested, onLogoutButtonPress }: IProps) => {
  return (
    <View>
      <Header headerText="Authentication" />
      {!initialRequested ? (
        <Spinner size="large" />
      ) : !loggedIn ? (
        <LoginForm />
      ) : (
        <Button onPress={onLogoutButtonPress}>
          <Text>Log Out</Text>
        </Button>
      )}
    </View>
  )
}

const enhancer: ComponentEnhancer<IProps, {}> = compose(
  withStateHandlers(
    {
      loggedIn: false,
      initialRequested: false
    },
    {
      onLogin: () => () => ({
        loggedIn: true
      }),
      onLogout: () => () => ({
        loggedIn: false
      }),
      onInitialRequest: () => () => ({
        initialRequested: true
      })
    }
  ),
  withHandlers({
    onLogoutButtonPress: () => (): void => {
      firebase.auth().signOut()
    }
  }),
  lifecycle<IProps, {}>({
    componentWillMount() {
      if (!this.props.initialRequested) {
        firebase.initializeApp(firebaseConfig)
      }
      firebase.auth().onAuthStateChanged(user => {
        user ? this.props.onLogin() : this.props.onLogout()
        this.props.onInitialRequest()
      })
    }
  })
)

export default enhancer(App)
