import { FETCH_OFFICIAL_EVALUATION, FETCH_OFFICIAL_EVALUATIONS } from '../actions/types';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_OFFICIAL_EVALUATION:
      const evaluation = action.payload;
      return { ...state, [evaluation.enterprise_id]: evaluation };
    case FETCH_OFFICIAL_EVALUATIONS:
      return  _.mapKeys(action.payload, 'enterprise_id');
    default:
      return state;
  }
}
