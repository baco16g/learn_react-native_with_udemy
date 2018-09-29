import { AsyncStorage } from 'react-native'
import { Facebook } from 'expo'
import { Dispatch } from 'redux'

import * as config from '../../config.json'
import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL } from './types'

export const facebookLogin = () => async (dispatch: Dispatch) => {
  const token = await AsyncStorage.getItem('fb_token')
  if (token) {
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token })
  } else {
    await doFacebookLogin(dispatch)
  }
}

const doFacebookLogin = async (dispatch: Dispatch) => {
  const { type, token } = await Facebook.logInWithReadPermissionsAsync(
    config.facebook.app_id,
    {
      permissions: ['public_profile']
    }
  )

  if (type === 'cancel' || !token) {
    dispatch({ type: FACEBOOK_LOGIN_FAIL })
    return
  }

  await AsyncStorage.setItem('fb_token', token)
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token })
}
