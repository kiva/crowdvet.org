import { FETCH_CROWD_EVALUATIONS } from '../actions/types';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_CROWD_EVALUATIONS:
        return  action.payload
    default:
      return state;
  }
}
