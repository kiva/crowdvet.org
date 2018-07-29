import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './authReducer';
import enterprisesReducer from './enterprisesReducer';
import questionsReducer from './questionsReducer';
import userEvaluationsReducer from './userEvaluationsReducer';
import officialEvaluationsReducer from './officialEvaluationsReducer';
import crowdVotes from './crowdEvaluationsReducer';
import commentsReducer from './commentsReducer';
import sectorsReducer from './sectorsReducer';
import countriesReducer from './countriesReducer';

export default combineReducers({
  auth: authReducer,
  enterprises: enterprisesReducer,
  form,
  questions: questionsReducer,
  evaluations: userEvaluationsReducer,
  officialEvaluations: officialEvaluationsReducer,
  crowdVotes: crowdVotes,
  comments: commentsReducer,
  sectors: sectorsReducer,
  countries: countriesReducer
});
