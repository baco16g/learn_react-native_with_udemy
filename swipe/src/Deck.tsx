import * as React from 'react'
import {
  View,
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  LayoutAnimation,
  UIManager
} from 'react-native'
import {
  compose,
  withProps,
  ComponentEnhancer,
  withHandlers,
  withStateHandlers,
  lifecycle
} from 'recompose'
import { $Call } from 'utility-types'

const SCREEN_WIDTH = Dimensions.get('window').width
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH
const SWIPE_OUT_DURATION = 250

interface IOuterProps {
  data: DataItem[]
  renderCard: (item: DataItem) => JSX.Element
  renderNoMoreCards: () => JSX.Element
  onSwipeRight: (item: DataItem) => void
  onSwipeLeft: (item: DataItem) => void
}

interface IProps extends IOuterProps, InnerProps, IWithHandlers {}

interface IWithStateHandlers {
  currentIndex: number
  incrementIndex: () => { currentIndex: number }
  resetCurrentIndex: () => { currentIndex: 0 }
}

interface InnerProps extends IWithPositionProp, IPanResponderProp {}

interface IWithPositionProp {
  position: Animated.ValueXY
}

interface IPanResponderProp {
  panResponder: $Call<typeof PanResponder.create>
}

interface IWithHandlers
  extends IWithStateHandlers,
    IWithDefaultHandlers,
    IWithOnSwipeCompleteHandler,
    IWithForceSwipeHandler {}

interface IWithDefaultHandlers {
  resetPosition: () => void
  getCardStyle: () => {
    [key: string]: Animated.ValueXY | Array<{ rotate: string }>
  }
}

interface IWithOnSwipeCompleteHandler {
  onSwipeComplete: (direction: string) => void
}

interface IWithForceSwipeHandler {
  forceSwipe: (direction: string) => void
}

////////////////////////

const Deck = ({
  data,
  renderCard,
  renderNoMoreCards,
  panResponder,
  getCardStyle,
  currentIndex
}: IProps) => {
  const renderCards = () => {
    if (currentIndex >= data.length) {
      return renderNoMoreCards()
    }

    return data
      .map((item, index) => {
        return index === currentIndex ? (
          <Animated.View
            key={item.id}
            style={[getCardStyle(), StyleSheet.flatten(styles.cardStyle)]}
            {...panResponder.panHandlers}
          >
            {renderCard(item)}
          </Animated.View>
        ) : index > currentIndex ? (
          <Animated.View
            key={item.id}
            style={[
              StyleSheet.flatten(styles.cardStyle),
              { top: 10 * (index - currentIndex) },
              { transform: [{ rotate: '0deg' }] }
            ]}
          >
            {renderCard(item)}
          </Animated.View>
        ) : null
      })
      .reverse()
  }

  return <View>{renderCards()}</View>
}

const enhancer: ComponentEnhancer<IProps, IOuterProps> = compose(
  withStateHandlers(
    {
      currentIndex: 0
    },
    {
      incrementIndex: ({ currentIndex }) => () => ({
        currentIndex: currentIndex + 1
      }),
      resetCurrentIndex: () => () => ({
        currentIndex: 0
      })
    }
  ),

  withProps({
    position: new Animated.ValueXY()
  }),

  withHandlers<IOuterProps & IWithStateHandlers & IWithPositionProp, {}>({
    getCardStyle: ({ position }) => () => {
      const rotate = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
        outputRange: ['-120deg', '0deg', '120deg']
      })
      return {
        ...position.getLayout(),
        transform: [{ rotate }]
      }
    },
    resetPosition: ({ position }) => () => {
      Animated.spring(position, {
        toValue: { x: 0, y: 0 }
      }).start()
    }
  }),

  withHandlers<
    IOuterProps & IWithStateHandlers & IWithPositionProp & IWithDefaultHandlers,
    {}
  >({
    onSwipeComplete: ({
      data,
      position,
      currentIndex,
      incrementIndex,
      onSwipeLeft,
      onSwipeRight
    }) => (direction: string) => {
      const item = data[currentIndex]
      direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item)
      position.setValue({ x: 0, y: 0 })
      incrementIndex()
    }
  }),

  withHandlers<
    IOuterProps &
      IWithStateHandlers &
      IWithPositionProp &
      IWithDefaultHandlers &
      IWithOnSwipeCompleteHandler,
    {}
  >({
    forceSwipe: ({ position, onSwipeComplete }) => (direction: string) => {
      const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH
      Animated.timing(position, {
        toValue: { x, y: 0 },
        duration: SWIPE_OUT_DURATION
      }).start(() => onSwipeComplete(direction))
    }
  }),

  withProps<
    IPanResponderProp,
    IOuterProps &
      IWithStateHandlers &
      IWithPositionProp &
      IWithDefaultHandlers &
      IWithOnSwipeCompleteHandler &
      IWithForceSwipeHandler
  >(({ position, resetPosition, forceSwipe }) => ({
    panResponder: PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        const { dx } = gesture
        position.setValue({ x: dx, y: 0 })
      },
      onPanResponderRelease: (event, gesture) => {
        const { dx } = gesture
        if (dx > SWIPE_THRESHOLD) {
          forceSwipe('right')
        } else if (dx < -SWIPE_THRESHOLD) {
          forceSwipe('left')
        } else {
          resetPosition()
        }
      }
    })
  })),

  lifecycle<IProps, IOuterProps>({
    componentWillUpdate() {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true)
      }
      LayoutAnimation.spring()
    },
    componentWillReceiveProps(nextProps) {
      if (nextProps.data !== this.props.data) {
        this.props.resetCurrentIndex()
      }
    }
  })
)

const styles = StyleSheet.create({
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    top: 0
  }
})

export default enhancer(Deck)
