import React from 'react'
import { StyleSheet, View } from 'react-native'
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation'
import { Provider } from 'react-redux'
import { Icon } from 'react-native-elements'

import store from './src/store'

import AuthScreen from './src/screens/AuthScreen'
import WelcomeScreen from './src/screens/WelcomeScreen'
import MapScreen from './src/screens/MapScreen'
import DeckScreen from './src/screens/DeckScreen'
import SettingScreen from './src/screens/SettingScreen'
import ReviewScreen from './src/screens/ReviewScreen'

export default () => {
  const MainNavigator = createBottomTabNavigator(
    {
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: createBottomTabNavigator(
          {
            map: {
              screen: MapScreen,
              navigationOptions: {
                title: 'Map',
                tabBarIcon: ({ tintColor }: { tintColor: string }) => (
                  <Icon name="my-location" size={24} color={tintColor} />
                )
              }
            },
            deck: {
              screen: DeckScreen,
              navigationOptions: {
                title: 'Jobs',
                tabBarIcon: ({ tintColor }: { tintColor: string }) => (
                  <Icon name="description" size={24} color={tintColor} />
                )
              }
            },
            review: {
              screen: createStackNavigator({
                review: ReviewScreen,
                settings: SettingScreen
              }),
              navigationOptions: {
                title: 'Review Jobs',
                tabBarIcon: ({ tintColor }: { tintColor: string }) => (
                  <Icon name="favorite" size={24} color={tintColor} />
                )
              }
            }
          },
          {
            tabBarPosition: 'bottom',
            tabBarOptions: {
              labelStyle: { fontSize: 12 }
            }
          }
        )
      }
    },
    {
      navigationOptions: {
        tabBarVisible: false
      },
      lazy: true
    }
  )

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <MainNavigator />
      </View>
    </Provider>
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
