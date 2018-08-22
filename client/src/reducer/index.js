import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './authReducer';
import enterprisesReducer from './enterprisesReducer';
import userEvaluationsReducer from './userEvaluationsReducer';
import officialEvaluationsReducer from './officialEvaluationsReducer';
import crowdVotes from './crowdEvaluationsReducer';
import commentsReducer from './commentsReducer';
import sectorsReducer from './sectorsReducer';
import suggestedReducer from './suggestedReducer';
import countriesReducer from './countriesReducer';
import recomendationsReducer from './recomendationsReducer';

export default combineReducers({
  auth: authReducer,
  enterprises: enterprisesReducer,
  form,
  evaluations: userEvaluationsReducer,
  officialEvaluations: officialEvaluationsReducer,
  crowdVotes: crowdVotes,
  comments: commentsReducer,
  sectors: sectorsReducer,
  countries: countriesReducer,
  suggested: suggestedReducer,
  recomendations: recomendationsReducer
});
