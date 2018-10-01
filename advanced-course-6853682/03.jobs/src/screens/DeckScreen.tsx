import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { compose, ComponentEnhancer, withHandlers } from 'recompose'
import { NavigationScreenProp } from 'react-navigation'
import { Card, Button } from 'react-native-elements'
import HTML from 'react-native-render-html'
import FitImage from 'react-native-fit-image'
import { $Call } from 'utility-types'
import { IRootStore } from '../reducers'
import * as actions from '../actions'
import Swipe from '../components/Swipe'

type Props = {
  jobs: Job[]
} & IOuterProps &
  IPropsConnected &
  IHandler

interface IOuterProps {
  navigation: NavigationScreenProp<any>
}

interface IPropsConnected
  extends $Call<typeof mapDispatchToProps>,
    $Call<typeof mapStateToProps> {}

interface IHandler {
  onSwipeRight: (job: Job) => void
  onNavigateToMap: () => void
}

const DeckScreen = ({ jobs, onSwipeRight, onNavigateToMap }: Props) => {
  const renderCard = (job: Job) => (
    <Card title={job.title}>
      {job.company_logo && (
        <FitImage
          source={{ uri: job.company_logo }}
          resizeMode="contain"
          style={styles.logo}
        />
      )}
      <View style={styles.detailWrapper}>
        <Text>{job.company}</Text>
        <Text>{job.location}</Text>
      </View>
      <View style={styles.descWrapper}>
        <Text style={styles.heading}>Description</Text>
        <HTML html={job.description} />
      </View>
    </Card>
  )
  const renderNoMoreCards = () => (
    <Card title="No More Jobs">
      <Button
        title="Back to Map"
        large
        icon={{ name: 'my-location' }}
        backgroundColor="#03A9F4"
        onPress={onNavigateToMap}
      />
    </Card>
  )

  return (
    <View style={styles.swiper}>
      <Swipe
        data={jobs}
        renderCard={renderCard}
        renderNoMoreCards={renderNoMoreCards}
        onSwipeLeft={() => ({})}
        onSwipeRight={onSwipeRight}
      />
    </View>
  )
}

const mapStateToProps = ({ job }: IRootStore) => ({
  jobs: job.list
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    ...bindActionCreators(actions, dispatch)
  }
})

const enhancer: ComponentEnhancer<Props, IOuterProps> = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withHandlers<IOuterProps & IPropsConnected, IHandler>({
    onSwipeRight: ({ actions: { likeJob } }) => (item: Job) => {
      likeJob({ job: item })
    },
    onNavigateToMap: ({ navigation }) => () => {
      navigation.navigate('map')
    }
  })
)

const styles = StyleSheet.create({
  swiper: {
    marginTop: 30
  },
  logo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 100,
    marginBottom: 30
  },
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    marginBottom: 30,
    paddingBottom: 15,
    borderBottomWidth: 1
  },
  descWrapper: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignContent: 'center',
    marginBottom: 30
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 16
  }
})

export default enhancer(DeckScreen)
