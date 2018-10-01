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
import { createUser, requestOneTimePassword } from '../../api/'

type Props = IState & IUpdater & IHandlers

interface IState {
  phone: string
}

type IUpdater = StateHandlerMap<IState> & {
  updatePhone(): StateHandler<IState>
}

interface IHandlers {
  handleSubmit: () => void
}

const SignUpForm = ({ phone, updatePhone, handleSubmit }: Props) => {
  return (
    <View>
      <View style={{ marginBottom: 10 }}>
        <FormLabel>Enter Phone Number</FormLabel>
        <FormInput value={phone} onChangeText={updatePhone} />
      </View>
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  )
}

const styles = StyleSheet.create({})

const enhancer: ComponentEnhancer<Props, {}> = compose(
  withStateHandlers<IState, IUpdater>(
    {
      phone: ''
    },
    {
      updatePhone: () => (phone: string) => ({
        phone
      })
    }
  ),
  withHandlers<IState & IUpdater, IHandlers>({
    handleSubmit: ({ phone }) => async () => {
      await createUser({ phone })
      await requestOneTimePassword({ phone })
    }
  })
)

export default enhancer(SignUpForm)
