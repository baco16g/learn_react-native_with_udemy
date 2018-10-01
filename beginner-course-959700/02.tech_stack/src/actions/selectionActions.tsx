import { $Call } from 'utility-types'

export const selectLibrary = (libraryId: number) => {
  return {
    type: 'SELECT_LIBRARY',
    payload: {
      id: libraryId
    }
  }
}

export type Actions = $Call<typeof selectLibrary>
