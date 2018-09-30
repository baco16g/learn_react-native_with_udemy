import { combineReducers } from 'redux'
import * as auth from './auth'
import * as job from './job'

export interface IRootStore {
  auth: auth.IState
  job: job.IState
}

export default combineReducers<IRootStore>({
  auth: auth.reducer,
  job: job.reducer
})
