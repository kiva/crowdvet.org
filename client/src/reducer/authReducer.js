import { FETCH_USER, AUTH_ERROR, SIGNIN_ERROR } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload ? {...action.payload, error:'', signinError: ''} : false
    case AUTH_ERROR:
      return { error: action.payload, signinError: '' }
    case SIGNIN_ERROR:
      return { signinError: action.payload, error:'' }
    default:
      return state;
  }
}
