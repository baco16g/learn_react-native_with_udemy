import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SignUpForm from './src/components/SignUpForm'

const App = () => (
  <View style={styles.container}>
    <SignUpForm />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default App
