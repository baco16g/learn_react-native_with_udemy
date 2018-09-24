import { withStateHandlers } from 'recompose'

const currentIndexState = withStateHandlers(
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
)

export { currentIndexState }
