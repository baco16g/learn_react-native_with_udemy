import actionCreatorFactory from 'typescript-fsa'

const actionCreator = actionCreatorFactory()

export interface IPramsForFetchJob {
  region: Region
  cb: () => void
}

export interface IResultForFetchJob {
  list: Job[]
}

export const fetchJobs = actionCreator.async<
  IPramsForFetchJob,
  IResultForFetchJob
>('FETCH_JOBS')
