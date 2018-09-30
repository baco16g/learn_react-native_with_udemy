import { combineReducers } from 'redux'
import * as auth from './auth'
import * as job from './job'
import * as like from './like'

export interface IRootStore {
  auth: auth.IState
  job: job.IState
  like: like.IState
}

export default combineReducers<IRootStore>({
  auth: auth.reducer,
  job: job.reducer,
  like: like.reducer
})
