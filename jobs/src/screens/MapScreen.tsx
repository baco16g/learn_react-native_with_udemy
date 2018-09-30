import * as React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import {
  compose,
  ComponentEnhancer,
  lifecycle,
  withHandlers,
  withStateHandlers,
  StateHandlerMap
} from 'recompose'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { MapView } from 'expo'
import { Button } from 'react-native-elements'
import { NavigationScreenProp } from 'react-navigation'
import { $Call } from 'utility-types'

import * as actions from '../actions'

type Props = IOuterProps & IState & StateUpdater

interface IOuterProps {
  navigation: NavigationScreenProp<any>
}

interface IPropsConnected
  extends $Call<typeof mapDispatchToProps>,
    $Call<typeof mapStateToProps> {}

interface IState {
  region: Region
  mapLoaded: boolean
}

type StateUpdater = StateHandlerMap<IState> & {
  onRegionChangeComplete: (region: Region) => void
}

interface IHandler {
  onButtonPress: () => void
}

const MapScreen = ({
  region,
  mapLoaded,
  onRegionChangeComplete,
  onButtonPress
}: Props) =>
  mapLoaded ? (
    <View style={{ flex: 1 }}>
      <MapView
        region={region}
        onRegionChangeComplete={onRegionChangeComplete}
        style={{ flex: 1 }}
      />
      <View style={styles.buttonContainer}>
        <Button
          large
          title="Search this Area"
          icon={{ name: 'search' }}
          backgroundColor="#009688"
          onPress={onButtonPress}
        />
      </View>
    </View>
  ) : (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  )

const mapStateToProps = () => ({})

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
  withStateHandlers<IState, StateUpdater>(
    {
      region: {
        longitude: -122,
        latitude: 37,
        longitudeDelta: 0.04,
        latitudeDelta: 0.09
      },
      mapLoaded: false
    },
    {
      onRegionChangeComplete: () => region => ({
        region
      })
    }
  ),
  withHandlers<IOuterProps & IPropsConnected & IState, IHandler>({
    onButtonPress: ({ actions: { fetchJobs }, region, navigation }) => () => {
      fetchJobs(region, () => {
        navigation.navigate('deck')
      })
    }
  }),
  lifecycle({
    componentDidMount() {
      this.setState({ mapLoaded: true })
    }
  })
)

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0
  }
})

export default enhancer(MapScreen)
