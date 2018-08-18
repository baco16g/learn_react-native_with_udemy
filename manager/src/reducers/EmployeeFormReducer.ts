import firebase from 'firebase'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import * as actions from '../actions/employee'
import * as asyncActions from '../actions/employee/async'

export interface IState {
  name: string
  phone: string
  shift: DayOfTheWeek
}

const initialState: IState = {
  name: '',
  phone: '',
  shift: 'Monday'
}

export default reducerWithInitialState(initialState)
  .case(actions.employeeUpdate, (state, { prop, value }) => ({
    ...state,
    [prop]: value
  }))
  .case(asyncActions.employeeCreate.done, state => ({ ...initialState }))
