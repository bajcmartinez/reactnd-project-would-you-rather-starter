import { RECEIVE_USERS, LOG_IN, LOG_IN_ERROR, LOG_OUT } from '../actions/auth'

export default function loading (state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                users: { ...action.users },
            };
        case LOG_IN:
            return state.users ? {
                ...state,
                user: state.users[action.username],
                error: null
            }: {};
        case LOG_IN_ERROR:
            return {
                ...state,
                user: null,
                error: action.error
            };
        case LOG_OUT :
            return {
                ...state,
                user: null,
                error: null
            };
        default :
            return state
    }
}