import actionCreatorFactory from 'typescript-fsa'
import { bindThunkAction } from 'typescript-fsa-redux-thunk'
import { Actions as routerActions } from 'react-native-router-flux'
import * as asyncActions from './async'
import * as firebaseUtils from '../../utils/firebase'

const actionCreator = actionCreatorFactory()

export const employeeUpdate = actionCreator<{ prop: string; value: string }>(
  'EMLOYEE_UPDATE'
)

export const employeeCreate = bindThunkAction(
  asyncActions.employeeCreate,
  async params => {
    const currentUser = firebaseUtils.getCurentUser()
    firebaseUtils
      .pushEmployee(currentUser, params)
      .then(() => routerActions.main({ type: 'reset' }))
  }
)

export const employeeSave = bindThunkAction(
  asyncActions.employeeSave,
  async params => {
    const currentUser = firebaseUtils.getCurentUser()
    firebaseUtils
      .saveEmployee(currentUser, params)
      .then(() => routerActions.main({ type: 'reset' }))
  }
)

export const employeeDelete = bindThunkAction(
  asyncActions.employeeDelete,
  async params => {
    const currentUser = firebaseUtils.getCurentUser()
    firebaseUtils
      .deleteEmployee(currentUser, params)
      .then(() => routerActions.main({ type: 'reset' }))
  }
)

export const employeesFetch = actionCreator<{ list: any }>('EMPLOYEES_FETCH')

export const addEventForEmployeesFetch = bindThunkAction(
  asyncActions.addEventForEmployeesFethch,
  async (_, dispatch) => {
    const currentUser = firebaseUtils.getCurentUser()
    firebaseUtils.addEventForfetchEmployees(currentUser, snapshot => {
      dispatch(employeesFetch({ list: snapshot.val() }))
    })
  }
)
