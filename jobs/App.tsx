import React from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Icon } from 'react-native-elements'
import { compose, lifecycle } from 'recompose'
import { Notifications } from 'expo'

import registerForNotifications from './services/push_notifications'
import store, { persistor } from './src/store'

import AuthScreen from './src/screens/AuthScreen'
import WelcomeScreen from './src/screens/WelcomeScreen'
import MapScreen from './src/screens/MapScreen'
import DeckScreen from './src/screens/DeckScreen'
import SettingScreen from './src/screens/SettingScreen'
import ReviewScreen from './src/screens/ReviewScreen'

const App = () => {
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
      <PersistGate loading={null} persistor={persistor}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </PersistGate>
    </Provider>
  )
}

const enhancer = compose(
  lifecycle({
    componentDidMount() {
      registerForNotifications()
      Notifications.addListener(notification => {
        const {
          data: { text },
          origin
        } = notification
        if (origin === 'received' && text) {
          Alert.alert('New Push Notification', text, [{ text: 'Ok.' }])
        }
      })
    }
  })
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
    // alignItems: 'center',
    // justifyContent: 'center'
  }
})

export default enhancer(App)
