import axios from 'axios'
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
