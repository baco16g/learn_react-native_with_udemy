import * as React from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'

import AlbumList from './components/AlbumList'
import Header from './components/Header'

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header headerText={'Albums'} />
      <AlbumList />
    </View>
  )
}

export default App
