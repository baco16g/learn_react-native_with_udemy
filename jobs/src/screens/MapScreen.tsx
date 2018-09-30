import * as React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import {
  compose,
  ComponentEnhancer,
  withState,
  lifecycle,
  withHandlers,
  withStateHandlers,
  StateHandlerMap
} from 'recompose'
import { MapView } from 'expo'

type Props = IState & StateUpdater

interface IState {
  region: Region
  mapLoaded: boolean
}

type StateUpdater = StateHandlerMap<IState> & {
  onRegionChangeComplete: (region: Region) => void
}

const MapScreen = ({ region, mapLoaded, onRegionChangeComplete }: Props) =>
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

const enhancer: ComponentEnhancer<Props, {}> = compose(
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
  lifecycle({
    componentDidMount() {
      this.setState({ mapLoaded: true })
    }
  })
)

export default enhancer(MapScreen)
