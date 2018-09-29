import * as React from 'react'
import { View, Text, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { compose, ComponentEnhancer, lifecycle } from 'recompose'
import { $Call } from 'utility-types'

import * as actions from '../actions'

interface IPropsConnected
  extends $Call<typeof mapDispatchToProps>,
    $Call<typeof mapStateToProps> {}

const AuthScreen = () => (
  <View>
    <Text>AuthScreen</Text>
    <Text>AuthScreen</Text>
    <Text>AuthScreen</Text>
    <Text>AuthScreen</Text>
    <Text>AuthScreen</Text>
  </View>
)

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    actions: {
      ...bindActionCreators(actions, dispatch)
    }
  }
}

const enhancer: ComponentEnhancer<{}, {}> = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle<IPropsConnected, {}>({
    componentDidMount() {
      this.props.actions.facebookLogin()
      AsyncStorage.removeItem('fb_token')
    }
  })
)

export default enhancer(AuthScreen)
