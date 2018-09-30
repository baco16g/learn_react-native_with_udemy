import { Animated } from 'react-native'

interface IProps {
  position: Animated.ValueXY
  screenWidth: number
}

const getCardStyleHandler = ({ position, screenWidth }: IProps) => () => {
  const rotate = position.x.interpolate({
    inputRange: [-screenWidth * 1.5, 0, screenWidth * 1.5],
    outputRange: ['-120deg', '0deg', '120deg']
  })
  return {
    ...position.getLayout(),
    transform: [{ rotate }]
  }
}

export { getCardStyleHandler }
