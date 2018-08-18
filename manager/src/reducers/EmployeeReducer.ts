import firebase from 'firebase'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import * as actions from '../actions/employee'

export interface IState {
  list: any
}

const initialState: IState = {
  list: null
}

export default reducerWithInitialState(initialState).case(
  actions.employeesFetch,
  (state, { list }) => ({
    ...state,
    list
  })
)
