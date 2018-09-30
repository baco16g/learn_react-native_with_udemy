import { Animated } from 'react-native'

interface IProps {
  data: SwipeItem[]
  position: Animated.ValueXY
  currentIndex: number
  incrementIndex: () => { currentIndex: number }
  onSwipeLeft: (item: SwipeItem) => void
  onSwipeRight: (item: SwipeItem) => void
}

const onSwipeCompleteHandler = ({
  data,
  position,
  currentIndex,
  incrementIndex,
  onSwipeLeft,
  onSwipeRight
}: IProps) => (direction: string) => {
  const item = data[currentIndex]
  direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item)
  position.setValue({ x: 0, y: 0 })
  incrementIndex()
}

export { onSwipeCompleteHandler }
