import { combineReducers } from 'redux'
import LibraryReducer, { IState as LibraryState } from './LibraryReducer'
import SelectionReducer, { IState as SelectionState } from './SelectionReducer'

export default combineReducers({
  libraries: LibraryReducer,
  selectedLibrary: SelectionReducer
})

export interface IRootState {
  libraries: LibraryState
  selectedLibrary: SelectionState
}
