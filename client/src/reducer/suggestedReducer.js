import { FETCH_SUGGESTED } from '../actions/types';
import _ from "lodash";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_SUGGESTED:
      return _.mapKeys(action.payload, "id");
    default:
      return state;
  }
}
