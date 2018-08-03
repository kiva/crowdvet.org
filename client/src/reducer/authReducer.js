import { FETCH_USER, AUTH_ERROR } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload ? {...action.payload, error:''} : false
    case AUTH_ERROR:
      return { error: action.payload }
    default:
      return state;
  }
}
