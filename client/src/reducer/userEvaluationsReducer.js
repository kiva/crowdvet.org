import {
  FETCH_USER_EVALUATION,
  FETCH_USER_EVALUATIONS,
  DELETE_EVALUATION
} from "../actions/types";
import _ from "lodash";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_USER_EVALUATION:
      return !action.payload
        ? state
        : { ...state, [action.payload.enterprise_id]: action.payload };
      return;
    case FETCH_USER_EVALUATIONS:
      return _.mapKeys(action.payload, "enterprise_id");
    case DELETE_EVALUATION:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}
