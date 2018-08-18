import actionCreatorFactory from 'typescript-fsa'
import firebase from 'firebase'

const actionCreator = actionCreatorFactory()

interface ILoginResult {
  user: firebase.auth.UserCredential | null
}

export const loginUser = actionCreator.async<ILoginParams, ILoginResult>(
  'LOGIN_USER'
)
