import { Animated, PanResponder } from 'react-native'

interface IProps {
  position: Animated.ValueXY
  swipeThreshold: number
  resetPosition: () => void
  forceSwipe: (direction: string) => void
}

const panResponderProp = ({
  position,
  swipeThreshold,
  resetPosition,
  forceSwipe
}: IProps) => ({
  panResponder: PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      const { dx } = gesture
      position.setValue({ x: dx, y: 0 })
    },
    onPanResponderRelease: (event, gesture) => {
      const { dx } = gesture
      if (dx > swipeThreshold) {
        forceSwipe('right')
      } else if (dx < -swipeThreshold) {
        forceSwipe('left')
      } else {
        resetPosition()
      }
    }
  })
})

export { panResponderProp }
