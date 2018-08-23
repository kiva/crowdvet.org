import { FETCH_RECOMENDATIONS } from '../actions/types';


export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_RECOMENDATIONS:
      return { ...action.payload }
    default:
      return state;
  }
}
