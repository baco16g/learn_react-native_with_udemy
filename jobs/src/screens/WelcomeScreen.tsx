import * as React from 'react'
import { AsyncStorage } from 'react-native'
import {
  compose,
  ComponentEnhancer,
  withState,
  withProps,
  withHandlers,
  lifecycle
} from 'recompose'
import { NavigationScreenProp } from 'react-navigation'
import { AppLoading } from 'expo'
import _ from 'lodash'
import Slides, { IData } from '../components/Slides'

type Props = {
  slideData: IData[]
} & IState &
  IHandlers

interface IOuterProps {
  navigation: NavigationScreenProp<any>
}

interface IState {
  hasToken: boolean | null
}

interface IHandlers {
  onSlideComplete: () => void
}

const WelcomeScreen = ({ slideData, hasToken, onSlideComplete }: Props) =>
  _.isNull(hasToken) ? (
    <AppLoading />
  ) : (
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
  withState('hasToken', '', null),
  withHandlers<IOuterProps, {}>({
    onSlideComplete: ({ navigation }) => () => {
      navigation.navigate('auth')
    }
  }),
  lifecycle<IOuterProps & IState & IHandlers, {}>({
    async componentWillMount() {
      const token = await AsyncStorage.getItem('fb_token')
      if (token) {
        this.props.navigation.navigate('auth')
      } else {
        this.setState({ token: false })
      }
    }
  })
)

export default enhancer(WelcomeScreen)
