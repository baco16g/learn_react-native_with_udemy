import * as React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import {
  compose,
  ComponentEnhancer,
  withState,
  lifecycle,
  withHandlers,
  withStateHandlers
} from 'recompose'
import { MapView } from 'expo'

interface IProps extends IState, IStateUpdater {}

interface IRegion {
  longitude: number
  latitude: number
  longitudeDelta: number
  latitudeDelta: number
}

interface IState {
  region: IRegion
  mapLoaded: boolean
}

interface IStateUpdater {
  onRegionChangeComplete: (region: IRegion) => void
}

const MapScreen = ({ region, mapLoaded, onRegionChangeComplete }: IProps) =>
  mapLoaded ? (
    <View style={{ flex: 1 }}>
      <MapView
        region={region}
        onRegionChangeComplete={onRegionChangeComplete}
        style={{ flex: 1 }}
      />
    </View>
  ) : (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  )

const enhancer: ComponentEnhancer<IProps, {}> = compose(
  withState('mapLoaded', '', false),
  withStateHandlers(
    {
      region: {
        longitude: -122,
        latitude: 37,
        longitudeDelta: 0.04,
        latitudeDelta: 0.09
      }
    },
    {
      onRegionChangeComplete: () => (region: IRegion) => ({
        region
      })
    }
  ),
  lifecycle({
    componentDidMount() {
      this.setState({ mapLoaded: true })
    }
  })
)

export default enhancer(MapScreen)
