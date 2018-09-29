import * as React from 'react'
import { View, Text } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { compose, ComponentEnhancer, lifecycle, withHandlers } from 'recompose'
import { $Call } from 'utility-types'

import * as actions from '../actions'
import { IRootStore } from '../reducers'

interface IOuterProps {
  navigation: NavigationScreenProp<any>
}

interface IPropsConnected
  extends $Call<typeof mapDispatchToProps>,
    $Call<typeof mapStateToProps> {}

interface IHandlers {
  onAuthComplete: (token: string | null) => void
}

const AuthScreen = () => <View />

const mapStateToProps = ({ auth }: IRootStore) => ({
  token: auth.token
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    ...bindActionCreators(actions, dispatch)
  }
})

const enhancer: ComponentEnhancer<{}, IOuterProps> = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withHandlers<IOuterProps & IPropsConnected, IHandlers>({
    onAuthComplete: ({ navigation }) => (token: string | null) => {
      if (token) {
        navigation.navigate('map')
      }
    }
  }),
  lifecycle<IOuterProps & IPropsConnected & IHandlers, {}>({
    componentDidMount() {
      this.props.actions.facebookLogin()
      this.props.onAuthComplete(this.props.token)
    },
    componentWillReceiveProps(nextProps) {
      this.props.onAuthComplete(nextProps.token)
    }
  })
)

export default enhancer(AuthScreen)
