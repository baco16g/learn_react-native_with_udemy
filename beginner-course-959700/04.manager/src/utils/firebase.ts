import firebase from 'firebase'
import config from '../config/fb'

firebase.initializeApp(config)

type User = firebase.User
type SnapShot = firebase.database.DataSnapshot

export const signIn = ({ email, password }: ILoginParams) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
}

export const signUp = ({ email, password }: ILoginParams) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
}

export const getCurentUser = () => {
  const { currentUser } = firebase.auth()
  if (!currentUser) {
    throw new Error('User not found')
  }
  return currentUser
}

const connectDBtoEmployees = (currentUser: User) => {
  return firebase.database().ref(`/users/${currentUser.uid}/employees`)
}

const connectDBtoEmployee = (currentUser: User, uid: string) => {
  return firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
}

export const pushEmployee = (
  currentUser: User,
  { name, phone, shift }: IPushEmployeeParams
) => {
  return connectDBtoEmployees(currentUser).push({ name, phone, shift })
}

export const addEventForfetchEmployees = (
  currentUser: User,
  cb: (snapshot: SnapShot) => void
) => {
  connectDBtoEmployees(currentUser).on('value', snapshot => {
    if (!snapshot) {
      throw new Error('SnapShot not found')
    }
    cb(snapshot)
  })
}

export const saveEmployee = (
  currentUser: User,
  { name, phone, shift, uid }: ISaveEmployeeParams
) => {
  return connectDBtoEmployee(currentUser, uid).set({ name, phone, shift, uid })
}

export const deleteEmployee = (
  currentUser: User,
  { uid }: IDeleteEmployeeParams
) => {
  return connectDBtoEmployee(currentUser, uid).remove()
}
