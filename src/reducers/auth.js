import {RECEIVE_USERS, LOG_IN, LOG_IN_ERROR, LOG_OUT, USER_ANSWERED, USER_ASKED} from '../actions/auth'

export default function loading (state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                users: { ...action.users },
            };
        case USER_ANSWERED:
            return {
                ...state,
                users: {
                    ...state.users,
                    [state.user.id]: {
                        ...state.users[state.user.id],
                        answers: {
                            ...state.users[state.user.id].answers,
                            [action.question]: action.answer
                        }
                    }
                }
            };
        case USER_ASKED:
            return {
                ...state,
                users: {
                    ...state.users,
                    [state.user.id]: {
                        ...state.users[state.user.id],
                        questions: [
                            ...state.users[state.user.id].questions,
                            action.question.id
                        ]
                    }
                }
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