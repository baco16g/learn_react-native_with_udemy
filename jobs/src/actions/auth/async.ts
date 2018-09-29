import actionCreatorFactory from 'typescript-fsa'

const actionCreator = actionCreatorFactory()

export const facebookLogin = actionCreator.async<null, { token: string }>(
  'FACEBOOK_LOGIN'
)
