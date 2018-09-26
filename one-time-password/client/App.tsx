import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { compose, ComponentEnhancer, lifecycle } from 'recompose'
import firebase from 'firebase'
import * as config from './config.json'
import SignUpForm from './src/components/SignUpForm'
import SignInForm from './src/components/SignInForm'

const App = () => (
  <View style={styles.container}>
    <SignUpForm />
    <SignInForm />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
})

const enhancer: ComponentEnhancer<{}, {}> = compose(
  lifecycle({
    componentDidMount() {
      firebase.initializeApp(config.firebase)
    }
  })
)

export default enhancer(App)
