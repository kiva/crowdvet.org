import { FETCH_COMMENT, FETCH_COMMENTS, FETCH_COMMENT_REPLY, DELETE_COMMENT} from "../actions/types";
import _ from "lodash";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_COMMENT:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_COMMENT:
      return _.omit(state, action.payload);
    case FETCH_COMMENTS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_COMMENT_REPLY:
      const reply = action.payload;
      const comment = state[action.payload.comment_id];
      return {
        ...state,
        [action.payload.comment_id]: {
          ...comment,
          Replies: comment.Replies ? comment.Replies.concat(reply) : [{...reply}]
        }
      };
    default:
      return state;
  }
}
