import { Animated } from 'react-native'

interface IProps {
  position: Animated.ValueXY
  screenWidth: number
  swipeOutDuration: number
  onSwipeComplete: (direction: string) => void
}

const forceSwipeHandler = ({
  position,
  screenWidth,
  swipeOutDuration,
  onSwipeComplete
}: IProps) => (direction: string) => {
  const x = direction === 'right' ? screenWidth : -screenWidth
  Animated.timing(position, {
    toValue: { x, y: 0 },
    duration: swipeOutDuration
  }).start(() => onSwipeComplete(direction))
}

export { forceSwipeHandler }
