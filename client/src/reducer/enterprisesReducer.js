import {
  FETCH_ENTERPRISES,
  FETCH_ENTERPRISE,
  FETCH_COMMENT
} from "../actions/types";
import _ from "lodash";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_ENTERPRISES:
      return _.mapKeys(action.payload, "id");
    case FETCH_ENTERPRISE:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_COMMENT:
      const comment = action.payload;
      const enterprise = state[comment.enterprise_id];
      return {
        ...state,
        [enterprise.id]: {
          ...enterprise,
          Comments: enterprise.Comments.concat(comment)
        }
      };
    default:
      return state;
  }
}
