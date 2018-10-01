import actionCreatorFactory from 'typescript-fsa'
import { bindThunkAction } from 'typescript-fsa-redux-thunk'
import { Actions as routerActions } from 'react-native-router-flux'
import * as asyncActions from './async'
import * as firebaseUtils from '../../utils/firebase'

const actionCreator = actionCreatorFactory()

export const changeValue = actionCreator<{ prop: string; value: string }>(
  'CHANGE_VALUE'
)

export const changeError = actionCreator<{ error: string }>('CHANGE_ERROR')

export const loginUser = bindThunkAction(
  asyncActions.loginUser,
  async (params, dispatch) => {
    const user = await firebaseUtils.signIn(params).catch((error: Error) => {
      dispatch(changeError({ error: error.toString() }))
      return null
    })
    if (user) {
      routerActions.main()
    }
    return { user }
  }
)
