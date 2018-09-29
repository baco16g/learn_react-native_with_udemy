import { combineReducers } from 'redux'
import * as auth from './auth'

export interface IRootStore {
  auth: auth.IState
}

export default combineReducers<IRootStore>({
  auth: auth.reducer
})
