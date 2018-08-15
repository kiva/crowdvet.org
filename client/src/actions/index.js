import axios from "axios";
import _ from "lodash";
import {
  FETCH_USER,
  FETCH_ENTERPRISES,
  FETCH_ENTERPRISE,
  FETCH_QUESTIONS,
  FETCH_EVALUATION,
  FETCH_USER_EVALUATIONS,
  FETCH_USER_EVALUATION,
  FETCH_OFFICIAL_EVALUATIONS,
  FETCH_OFFICIAL_EVALUATION,
  DELETE_EVALUATION,
  FETCH_CROWD_EVALUATIONS,
  AUTH_USER,
  AUTH_ERROR,
  FETCH_COMMENT,
  FETCH_COMMENTS,
  FETCH_COMMENT_REPLY,
  FETCH_USER_COMMENT_VOTES,
  FETCH_SECTORS,
  FETCH_COUNTRIES,
  FETCH_SUGGESTED,
  SIGNIN_ERROR
} from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchUserEvaluations = () => async dispatch => {
  const res = await axios.get("/api/users/evaluations");
  dispatch({ type: FETCH_USER_EVALUATIONS, payload: res.data });
};

export const fetchUserEvaluation = id => async dispatch => {
  const res = await axios.get(`/api/users/evaluations/${id}`);
  dispatch({ type: FETCH_USER_EVALUATION, payload: res.data });
};
export const fetchOfficialEvaluations = () => async dispatch => {
  const res = await axios.get("/api/evaluations?official=true");
  dispatch({ type: FETCH_OFFICIAL_EVALUATIONS, payload: res.data });
};

export const fetchEnterprises = (values) => async dispatch => {
  const uri = "/api/users/enterprises";
  if (!_.isEmpty(values)) {
    const { filters, sort} = values
    let sortBy = "";
    let filterBy = "";

    if (!_.isEmpty(sort)) {
      sortBy = `&sort=${sort}`
    }
    if (!_.isEmpty(filters)) {
      filterBy = `?filter=${JSON.stringify(filters)}`;
    }
    const res = await axios.get(`${uri}/${filterBy}${sortBy}`);
    dispatch({ type: FETCH_ENTERPRISES, payload: res.data });
  } else {
    const res = await axios.get(`${uri}`);
    dispatch({ type: FETCH_ENTERPRISES, payload: res.data });
  }
};

export const fetchSuggested = (values) => async dispatch => {
  const uri = "/api/users/enterprises";
  console.log(values, "ACA")
  if (!_.isEmpty(values)) {
    let filterBy = "";
    const { filters, sort} = values

    if (!_.isEmpty(filters)) {
      filterBy = `?filter=${JSON.stringify(filters)}`;
    }
    const res = await axios.get(`${uri}/${filterBy}`);
    dispatch({ type: FETCH_SUGGESTED, payload: res.data });
  }
};


export const fetchEnterprise = id => async dispatch => {
  const res = await axios.get(`/api/enterprises/${id}`);
  dispatch({ type: FETCH_ENTERPRISE, payload: res.data });
};

export const signUpUser = (
  { email, password, name },
  history
) => async dispatch => {
  axios
    .post(`/auth/signup`, { email, password, name })
    .then(response => {
      dispatch({ type: FETCH_USER, payload: response.data });
      history.push("/user");
    })
    .catch(error => {
      dispatch(authError(error.response.data));
    });
};

export const signInUser = (
  { email, password },
  history
) => async dispatch => {
  axios
    .post(`/auth/login`, { email, password })
    .then(response => {
      dispatch({ type: FETCH_USER, payload: response.data });
      history.push("/user");
    })
    .catch(error => {
      dispatch(signInError(error.response.data));
    });
};

export const Evaluate = (
  { votes, enterprise_id, inProgress },
  history
) => async dispatch => {
  axios
    .post(`/api/evaluations`, { votes, enterprise_id, inProgress })
    .then(response => {
      dispatch({ type: FETCH_USER_EVALUATION, payload: response.data });
      if (history) {
        history.push(`/users/evaluations/results/${enterprise_id}`);
      }
    });
};

export const removeUserEvaluation = evaluation => async dispatch => {
  const res = await axios.delete(`/api/users/evaluations/${evaluation.id}`);
  dispatch({ type: DELETE_EVALUATION, payload: evaluation.enterprise_id });
};

export const fetchCrowdVotes = () => async dispatch => {
  const res = await axios.get(`/api/evaluations`);

  dispatch({ type: FETCH_CROWD_EVALUATIONS, payload: res.data });
};

export const createReply = ({ id, text, enterprise_id }) => async dispatch => {
  const res = await axios.post(`/api/comments/${id}/replies`, {
    text,
    enterprise_id
  });
  dispatch({ type: FETCH_COMMENT_REPLY, payload: res.data });
};

export const createComment = ({ id, text }) => async dispatch => {
  const res = await axios.post(`/api/enterprises/${id}/comments`, { text });
  dispatch({ type: FETCH_COMMENT, payload: res.data });
};

export const fetchEnterpriseComments = id => async dispatch => {
  const res = await axios.get(`/api/enterprises/${id}/comments`);

  dispatch({ type: FETCH_COMMENTS, payload: res.data });
};

export const fetchComments = () => async dispatch => {
  const res = await axios.get(`/api/enterprises/comments`);
  dispatch({ type: FETCH_COMMENTS, payload: res.data });
};

export const VoteComment = ({ id, vote }) => async dispatch => {
  const res = await axios.post(`/api/comments/${id}/votes`, { vote });
  dispatch({ type: FETCH_COMMENT, payload: res.data });
};

export const fetchSectors = () => async dispatch => {
  const res = await axios.get(`/api/sectors`);
  dispatch({ type: FETCH_SECTORS, payload: res.data });
};

export const updateUserSettings = values => async dispatch => {
  const res = await axios.put(`/api/users/settings`, { ...values });
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const updateUser = values => async dispatch => {
  const res = await axios.patch(`/api/users`, { attributes:{...values} });
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchCountries = () => async dispatch => {
  const res = await axios.get(`/api/countries`);
  dispatch({ type: FETCH_COUNTRIES, payload: res.data });
};

export function authError({ error }) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signInError({ error }) {
  return {
    type: SIGNIN_ERROR,
    payload: error
  };
}
