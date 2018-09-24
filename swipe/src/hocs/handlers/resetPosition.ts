import { Animated } from 'react-native'

interface IProps {
  position: Animated.ValueXY
}

const resetPositionHandler = ({ position }: IProps) => () => {
  Animated.spring(position, {
    toValue: { x: 0, y: 0 }
  }).start()
}

export { resetPositionHandler }
