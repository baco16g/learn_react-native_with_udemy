import * as React from 'react'
import { View, Text } from 'react-native'
import { compose, ComponentEnhancer, withProps, withHandlers } from 'recompose'
import { NavigationScreenProp } from 'react-navigation'
import Slides, { IData } from '../components/Slides'

type Props = {
  slideData: IData[]
} & IHandlers

interface IOuterProps {
  navigation: NavigationScreenProp<any>
}

interface IHandlers {
  onSlideComplete: () => void
}

const WelcomeScreen = ({ slideData, onSlideComplete }: Props) => (
  <Slides data={slideData} onComplete={onSlideComplete} />
)

const enhancer: ComponentEnhancer<Props, IOuterProps> = compose(
  withProps<{}, {}>({
    slideData: [
      {
        text: 'Welcome to JobApp',
        color: '#03A9F4'
      },
      {
        text: 'Use to get a job',
        color: '#009688'
      },
      {
        text: 'Set your location, then swipe away',
        color: '#03A9F4'
      }
    ]
  }),
  withHandlers<IOuterProps, {}>({
    onSlideComplete: ({ navigation }) => () => {
      navigation.navigate('auth')
    }
  })
)

export default enhancer(WelcomeScreen)
