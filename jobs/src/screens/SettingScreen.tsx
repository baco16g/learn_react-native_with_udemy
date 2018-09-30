import * as React from 'react'
import { View, Platform } from 'react-native'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { compose, ComponentEnhancer, withHandlers, setStatic } from 'recompose'
import { $Call } from 'utility-types'
import { Button } from 'react-native-elements'
import { IRootStore } from '../reducers'
import * as actions from '../actions'

type Props = IPropsConnected & IHandlers

interface IPropsConnected
  extends $Call<typeof mapDispatchToProps>,
    $Call<typeof mapStateToProps> {}

interface IHandlers {
  clearLikedJobs: () => void
}

const SettingScreen = ({ clearLikedJobs }: Props) => (
  <View style={{ marginTop: 20 }}>
    <Button
      title="Reset Liked Jobs"
      large
      icon={{ name: 'delete-forever' }}
      backgroundColor="#F44336"
      onPress={clearLikedJobs}
    />
  </View>
)

const mapStateToProps = (state: IRootStore) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    ...bindActionCreators(actions, dispatch)
  }
})

const enhancer: ComponentEnhancer<Props, {}> = compose(
  setStatic('navigationOptions', {
    headerStyle: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    }
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withHandlers<IPropsConnected, IHandlers>({
    clearLikedJobs: ({ actions: { clearLikedJobs } }) => () => {
      clearLikedJobs()
    }
  })
)

export default enhancer(SettingScreen)
