import * as React from 'react'
import { View } from 'react-native'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import { Header } from './components/common'
import LibraryList from './containers/LibraryList'

function configureStore(initialState?: object) {
  return createStore(rootReducer, initialState!)
}

const store = configureStore()

const App = () => {
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <Header headerText="Tech Stack" />
        <LibraryList />
      </View>
    </Provider>
  )
}

export default App
