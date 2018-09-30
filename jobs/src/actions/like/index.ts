import { actionCreatorFactory } from 'typescript-fsa'

const actionCreator = actionCreatorFactory()

export const likeJob = actionCreator<{ job: Job }>('LIKE_JOB')
