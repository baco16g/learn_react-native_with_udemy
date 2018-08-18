import * as React from 'react'
import { Text, StyleSheet } from 'react-native'
import { ComponentEnhancer, compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { $Call } from 'utility-types'
import { IRootState } from '../reducers'
import * as authActions from '../actions/auth'
import { Card, CardSection, Input, Button, Spinner } from '../components/common'

interface IPropsConnected
  extends $Call<typeof mapDispatchToProps>,
    $Call<typeof mapStateToProps> {}

interface IHandelrs {
  onChangeEmail: (value: string) => void
  onChangePassword: (value: string) => void
  onLoginUser: () => void
}

interface IProps extends IPropsConnected, IHandelrs {}

const LoginForm = ({
  email,
  password,
  error,
  loading,
  onChangeEmail,
  onChangePassword,
  onLoginUser
}: IProps) => {
  const renderButton = () =>
    loading ? (
      <Spinner size="large" />
    ) : (
      <Button onPress={onLoginUser}>
        <Text>Login</Text>
      </Button>
    )
  return (
    <Card>
      <CardSection>
        <Input
          label="Email"
          placeholder="email@gmail.com"
          onChangeText={onChangeEmail}
          value={email}
        />
      </CardSection>
      <CardSection>
        <Input
          label="Password"
          placeholder="password"
          onChangeText={onChangePassword}
          value={password}
          secureTextEntry
        />
      </CardSection>
      <Text style={styles.errorText}>{error}</Text>
      <CardSection>{renderButton()}</CardSection>
    </Card>
  )
}

const styles = StyleSheet.create({
  errorText: {
    fontSize: 20,
    alignSelf: 'center',
    color: '#ff0000'
  }
})

const mapStateToProps = (state: IRootState) => {
  return {
    ...state.auth
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    actions: {
      ...bindActionCreators(authActions, dispatch)
    }
  }
}

const enhancer: ComponentEnhancer<IProps, {}> = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withHandlers({
    onChangeEmail: ({ actions }: IPropsConnected) => (value: string): void => {
      actions.changeValue({ prop: 'email', value })
    },
    onChangePassword: ({ actions }: IPropsConnected) => (
      value: string
    ): void => {
      actions.changeValue({ prop: 'password', value })
    },
    onLoginUser: ({
      actions,
      email,
      password
    }: IPropsConnected) => (): void => {
      actions.loginUser({ email, password })
    }
  })
)

export default enhancer(LoginForm)
