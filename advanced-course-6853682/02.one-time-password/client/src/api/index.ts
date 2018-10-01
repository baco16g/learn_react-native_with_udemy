import axios from 'axios'
import firebase from 'firebase'
import * as config from '../../config.json'

export const createUser = ({ phone }: { phone: string }) => {
  return axios
    .post(`${config.api_root}/createUser`, {
      phone
    })
    .catch(error => window.console.log(error))
}

export const requestOneTimePassword = ({ phone }: { phone: string }) => {
  return axios
    .post(`${config.api_root}/requestOneTimePassword`, {
      phone
    })
    .catch(error => window.console.log(error))
}

export const velifyOneTimePassword = ({
  phone,
  code
}: {
  phone: string
  code: string
}) => {
  axios
    .post(`${config.api_root}/velifyOneTimePassword`, {
      phone,
      code
    })
    .then(res => {
      return res.data
    })
    .then(data => {
      firebase.auth().signInWithCustomToken(data.token)
    })
    .catch(err => window.console.log(err))
}
