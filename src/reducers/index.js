import { combineReducers } from 'redux';
import loading from './loading';
import auth from './auth';
import questions from './questions';

export default combineReducers({
    auth,
    loading,
    questions
})