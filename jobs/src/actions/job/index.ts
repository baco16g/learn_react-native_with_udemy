import { Dispatch } from 'redux'
import * as asyncActions from './async'
import * as api from '../../api'

export const fetchJobs = (region: Region, cb: () => void) => async (
  dispatch: Dispatch
) => {
  const data = await api.fetchJobs(region)
  if (!data) {
    failFetchJobs(dispatch, { region, cb })
    return
  }
  sucessFetchJobs(dispatch, { region, cb }, { list: data })
}

const sucessFetchJobs = (
  dispatch: Dispatch,
  params: asyncActions.IPramsForFetchJob,
  result: asyncActions.IResultForFetchJob
) => {
  dispatch(
    asyncActions.fetchJobs.done({
      params,
      result
    })
  )
  params.cb()
}

const failFetchJobs = (
  dispatch: Dispatch,
  params: asyncActions.IPramsForFetchJob
) => {
  dispatch(
    asyncActions.fetchJobs.failed({
      params,
      error: ''
    })
  )
}
