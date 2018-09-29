import { AsyncStorage } from 'react-native'
import { Facebook } from 'expo'
import { Dispatch } from 'redux'

import * as asyncActions from './async'
import * as config from '../../../config.json'

export const facebookLogin = () => async (dispatch: Dispatch) => {
  const token = await AsyncStorage.getItem('fb_token')
  if (token) {
    sucessFacebookLogin(dispatch, token)
  } else {
    doFacebookLogin(dispatch)
  }
}

const sucessFacebookLogin = (dispatch: Dispatch, token: string) => {
  dispatch(
    asyncActions.facebookLogin.done({
      params: null,
      result: { token }
    })
  )
}

const failFacebookLogin = (dispatch: Dispatch) => {
  dispatch(
    asyncActions.facebookLogin.failed({
      params: null,
      error: ''
    })
  )
}

const doFacebookLogin = async (dispatch: Dispatch) => {
  const { type, token } = await Facebook.logInWithReadPermissionsAsync(
    config.facebook.app_id,
    {
      permissions: ['public_profile']
    }
  )

  if (type === 'cancel' || !token) {
    failFacebookLogin(dispatch)
    return
  }

  await AsyncStorage.setItem('fb_token', token)
  sucessFacebookLogin(dispatch, token)
}
