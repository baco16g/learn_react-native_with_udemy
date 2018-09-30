import { reducerWithInitialState } from 'typescript-fsa-reducers'
import _ from 'lodash'
import * as actions from '../actions/like'

export interface IState {
  list: [] | Job[]
}

const initialState: IState = {
  list: []
}

export const reducer = reducerWithInitialState(initialState).case(
  actions.likeJob,
  (state, { job }) => ({
    ...state,
    list: _.uniqBy([job, ...state.list], 'id')
  })
)
