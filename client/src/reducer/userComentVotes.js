
import { FETCH_USER_COMMENT_VOTES } from '../actions/types';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_USER_COMMENT_VOTES:
        return  _.mapKeys(action.payload, 'id');
    default:
      return state;
  }
}
