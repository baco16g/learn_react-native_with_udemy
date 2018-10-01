import libraryList from '../data/LibraryList.json'

export interface ILibrary {
  id: number
  title: string
  description: string
}

export interface IState {
  data: ILibrary[]
}

const initialState: IState = {
  data: libraryList.data
}

export default (state: IState = initialState) => {
  return state
}
