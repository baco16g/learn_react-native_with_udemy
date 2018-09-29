import { reducerWithInitialState } from 'typescript-fsa-reducers'
import * as asyncActions from '../actions/auth/async'

export interface IState {
  token: string | null
}

const initialState: IState = {
  token: null
}

export const reducer = reducerWithInitialState(initialState)
  .case(asyncActions.facebookLogin.done, (state, { result }) => ({
    ...state,
    token: result.token
  }))
  .case(asyncActions.facebookLogin.failed, state => ({
    ...state
  }))
