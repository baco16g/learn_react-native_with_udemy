import { combineReducers } from 'redux'
import authReducer, { IState as AuthState } from './authReducer'
import employeeReducer, { IState as EmployeeState } from './EmployeeReducer'
import employeeFormReducer, {
  IState as EmployeeFormState
} from './EmployeeFormReducer'

export default combineReducers({
  auth: authReducer,
  employee: employeeReducer,
  employeeForm: employeeFormReducer
})

export interface IRootState {
  auth: AuthState
  employee: EmployeeState
  employeeForm: EmployeeFormState
}
