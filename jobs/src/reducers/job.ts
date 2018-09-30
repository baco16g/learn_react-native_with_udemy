import { reducerWithInitialState } from 'typescript-fsa-reducers'
import * as asyncActions from '../actions/job/async'

export interface IState {
  list: Job[]
}

const initialState: IState = {
  list: []
}

export const reducer = reducerWithInitialState(initialState)
  .case(asyncActions.fetchJobs.done, (state, { result }) => ({
    ...state,
    list: result.list
  }))
  .case(asyncActions.fetchJobs.failed, state => ({
    ...state
  }))
