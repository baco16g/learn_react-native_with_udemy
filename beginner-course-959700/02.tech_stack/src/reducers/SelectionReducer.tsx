import { Actions } from '../actions/selectionActions'

export interface IState {
  id: number | null
}

const initialState: IState = {
  id: null
}

export default (state: IState = initialState, action: Actions) => {
  switch (action.type) {
    case 'SELECT_LIBRARY':
      return action.payload
    default:
      return state
  }
}
