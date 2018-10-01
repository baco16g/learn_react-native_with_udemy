import actionCreatorFactory from 'typescript-fsa'
import firebase from 'firebase'

const actionCreator = actionCreatorFactory()

export const employeeCreate = actionCreator.async<IPushEmployeeParams, void>(
  'EMPLOYEE_CREATE '
)

export const employeeSave = actionCreator.async<ISaveEmployeeParams, void>(
  'EMPLOYEE_SAVE'
)

export const employeeDelete = actionCreator.async<IDeleteEmployeeParams, void>(
  'EMPLOYEE_DELETE'
)

export const addEventForEmployeesFethch = actionCreator.async<null, void>(
  'ADD_EVENT_FOR_EMPLOYEE_FETCH'
)
