import { Animated } from 'react-native'

interface IProps {
  data: DataItem[]
  position: Animated.ValueXY
  currentIndex: number
  incrementIndex: () => { currentIndex: number }
  onSwipeLeft: (item: DataItem) => void
  onSwipeRight: (item: DataItem) => void
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
