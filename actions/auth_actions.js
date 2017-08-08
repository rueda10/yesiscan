import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';

import {
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_FAIL
} from './types';

export const facebookLogin = () => async (dispatch) => {
    let token = await AsyncStorage.getItem('fb_token');

    if (token) {
        // Dispatch an action saying FB login is done
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        const facebook_id = (await response.json()).id;

        const payload = {
            token,
            facebook_id
        }

        dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload });
    } else {
        // start up FB login process
        doFacebookLogin(dispatch);
    }
};

export const getFacebookId = (token) => async (dispatch) => {
    const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
    const facebook_id = (await response.json()).id;

    const payload = {
        token,
        facebook_id
    }

    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload });
}

const doFacebookLogin = async (dispatch) => {
    let { type, token } = await Facebook.logInWithReadPermissionsAsync('135562593712588', {
        permissions: ['public_profile']
    });

    if (type === 'cancel') {
        return dispatch({ type: FACEBOOK_LOGIN_FAIL });
    }

    const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
    const facebook_id = (await response.json()).id;

    const payload = {
        token,
        facebook_id
    }

    await AsyncStorage.setItem('fb_token', token);
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload });
};
