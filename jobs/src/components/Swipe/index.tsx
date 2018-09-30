import * as React from 'react'
import {
  View,
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  LayoutAnimation,
  UIManager,
  ScrollView
} from 'react-native'
import {
  compose,
  withProps,
  ComponentEnhancer,
  withHandlers,
  lifecycle
} from 'recompose'
import { $Call } from 'utility-types'
import {
  getCardStyleHandler,
  resetPositionHandler,
  onSwipeCompleteHandler,
  forceSwipeHandler
} from './hocs/handlers'
import { panResponderProp } from './hocs/props'
import { currentIndexState } from './hocs/stateHandlers'

const SCREEN_WIDTH = Dimensions.get('window').width
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH
const SWIPE_OUT_DURATION = 250

type Item = any & { id: string }

interface IOuterProps {
  data: Item[]
  renderCard: (item: Item) => JSX.Element
  renderNoMoreCards: () => JSX.Element
  onSwipeRight: (item: Item) => void
  onSwipeLeft: (item: Item) => void
}

interface IProps extends IOuterProps, InnerProps, IWithHandlers {}

interface IWithStateHandlers {
  currentIndex: number
  incrementIndex: () => { currentIndex: number }
  resetCurrentIndex: () => { currentIndex: 0 }
}

interface InnerProps extends IWithInitialProp, IPanResponderProp {}

interface IWithInitialProp {
  position: Animated.ValueXY
  screenWidth: number
  swipeOutDuration: number
  swipeThreshold: number
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

const Swipe = ({
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
  currentIndexState,

  withProps({
    position: new Animated.ValueXY(),
    screenWidth: SCREEN_WIDTH,
    swipeOutDuration: SWIPE_OUT_DURATION,
    swipeThreshold: SWIPE_THRESHOLD
  }),

  withHandlers<IOuterProps & IWithStateHandlers & IWithInitialProp, {}>({
    getCardStyle: getCardStyleHandler,
    resetPosition: resetPositionHandler
  }),

  withHandlers<
    IOuterProps & IWithStateHandlers & IWithInitialProp & IWithDefaultHandlers,
    {}
  >({
    onSwipeComplete: onSwipeCompleteHandler
  }),

  withHandlers<
    IOuterProps &
      IWithStateHandlers &
      IWithInitialProp &
      IWithDefaultHandlers &
      IWithOnSwipeCompleteHandler,
    {}
  >({
    forceSwipe: forceSwipeHandler
  }),

  withProps<
    IPanResponderProp,
    IOuterProps &
      IWithStateHandlers &
      IWithInitialProp &
      IWithDefaultHandlers &
      IWithOnSwipeCompleteHandler &
      IWithForceSwipeHandler
  >(panResponderProp),

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

export default enhancer(Swipe)
