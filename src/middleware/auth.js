import { LOG_IN, logInError } from '../actions/auth';

const validateAuth = ({ dispatch, getState }) => next => action => {
    if (action.type === LOG_IN) {
        const { auth } = getState();
        if (action.username === '' || auth.users === undefined || auth.users[action.username] == null) {
            return dispatch(logInError("Invalid username or password!"))
        }else {
            return next(action);
        }
    }

    return next(action);
};

export default validateAuth;