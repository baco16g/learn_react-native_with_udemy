import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation'

import AuthScreen from './src/screens/AuthScreen'
import WelcomeScreen from './src/screens/WelcomeScreen'
import MapScreen from './src/screens/MapScreen'
import DeckScreen from './src/screens/DeckScreen'
import SettingScreen from './src/screens/SettingScreen'
import ReviewScreen from './src/screens/ReviewScreen'

export default () => {
  const MainNavigator = createBottomTabNavigator({
    welcome: { screen: WelcomeScreen },
    auth: { screen: AuthScreen },
    main: {
      screen: createBottomTabNavigator({
        map: MapScreen,
        deck: DeckScreen,
        review: {
          screen: createStackNavigator({
            review: { screen: ReviewScreen },
            settings: { screen: SettingScreen }
          })
        }
      })
    }
  })

  return (
    <View style={styles.container}>
      <MainNavigator />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
    // alignItems: 'center',
    // justifyContent: 'center'
  }
})
