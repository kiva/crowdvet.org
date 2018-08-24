import { FETCH_USER, AUTH_ERROR, SIGNIN_ERROR, UPDATE_SETTINGS, CLEAR_MESSAGES,
UPDATE_SETTINGS_ERROR } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload ? {...action.payload, error:'', signinError: '', settingsMessage:''} : false
    case AUTH_ERROR:
      return { error: action.payload, signinError: '' }
    case SIGNIN_ERROR:
      return { signinError: action.payload, error:'' }
    case UPDATE_SETTINGS:
      return { ...state, settingsMessage: action.payload, settingsErrorMessage: ''}
    case UPDATE_SETTINGS_ERROR:
        return { ...state, settingsErrorMessage: action.payload, settingsMessage: ''}
    case CLEAR_MESSAGES:
        return { ...state, settingsErrorMessage: '', settingsMessage: ''}
    default:
      return state;
  }
}
