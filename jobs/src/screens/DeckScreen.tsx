import * as React from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { compose, ComponentEnhancer } from 'recompose'
import { Card } from 'react-native-elements'
import HTML from 'react-native-render-html'
import { MapView } from 'expo'
import { IRootStore } from '../reducers'
import * as actions from '../actions'
import Swipe from '../components/Swipe'

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

interface IProps {
  jobs: Job[]
}

const DeckScreen = ({ jobs }: IProps) => {
  const renderCard = (job: SwipeItem | Job) => (
    <Card title={job.title}>
      {job.company_logo && <Image source={{ uri: job.company_logo }} />}
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
    <Card title="No More Card">
      <Text>Not Found</Text>
    </Card>
  )

  return (
    <View style={styles.swiper}>
      <Swipe
        data={jobs}
        renderCard={renderCard}
        renderNoMoreCards={renderNoMoreCards}
        onSwipeLeft={() => ({})}
        onSwipeRight={() => ({})}
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

const enhancer: ComponentEnhancer<IProps, {}> = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)

const styles = StyleSheet.create({
  swiper: {
    marginTop: 30
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
