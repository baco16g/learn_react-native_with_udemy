import * as React from 'react'
import { View, Text, Platform } from 'react-native'
import { compose, ComponentEnhancer, setStatic } from 'recompose'
import { Button } from 'react-native-elements'

const ReviewScreen = () => (
  <View>
    <Text>ReviewScreen</Text>
    <Text>ReviewScreen</Text>
    <Text>ReviewScreen</Text>
    <Text>ReviewScreen</Text>
    <Text>ReviewScreen</Text>
  </View>
)

const enhancer: ComponentEnhancer<any, any> = compose(
  setStatic('navigationOptions', ({ navigation }: { navigation: any }) => ({
    title: 'Review Jobs',
    headerRight: (
      <Button
        title="Settings"
        onPress={() => navigation.navigate('settings')}
        backgroundColor="rgba(0, 0, 0, 0)"
        color="rgba(0, 122, 255, 1)"
      />
    ),
    headerStyle: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    }
  }))
)

export default enhancer(ReviewScreen)
