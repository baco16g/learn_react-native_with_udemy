import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {
  compose,
  ComponentEnhancer,
  StateHandlerMap,
  StateHandler,
  withStateHandlers,
  withHandlers
} from 'recompose'
import { FormLabel, FormInput, Button } from 'react-native-elements'
import { velifyOneTimePassword } from '../../api'

type Props = IState & IUpdater & IHandlers

interface IState {
  phone: string
  code: string
}

type IUpdater = StateHandlerMap<IState> & {
  updatePhone(): StateHandler<IState>
  updateCode(): StateHandler<IState>
}

interface IHandlers {
  handleSubmit: () => void
}

const SignInForm = ({
  phone,
  code,
  updatePhone,
  updateCode,
  handleSubmit
}: Props) => {
  return (
    <View>
      <View style={{ marginBottom: 10 }}>
        <FormLabel>Enter Phone Number</FormLabel>
        <FormInput value={phone} onChangeText={updatePhone} />
      </View>
      <View style={{ marginBottom: 10 }}>
        <FormLabel>Enter Code</FormLabel>
        <FormInput value={code} onChangeText={updateCode} />
      </View>
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  )
}

const styles = StyleSheet.create({})

const enhancer: ComponentEnhancer<Props, {}> = compose(
  withStateHandlers<IState, IUpdater>(
    {
      phone: '',
      code: ''
    },
    {
      updatePhone: () => (phone: string) => ({
        phone
      }),
      updateCode: () => (code: string) => ({
        code
      })
    }
  ),
  withHandlers<IState & IUpdater, IHandlers>({
    handleSubmit: ({ phone, code }) => async () => {
      await velifyOneTimePassword({ phone, code })
    }
  })
)

export default enhancer(SignInForm)
