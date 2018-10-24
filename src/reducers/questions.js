import {RECEIVE_QUESTIONS, RESTORE_QUESTION, SAVE_QUESTION, SAVE_QUESTION_ANSWER} from '../actions/questions'

export default function loading (state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...action.questions
            };
        case SAVE_QUESTION:
            return {
                ...state,
                [action.question.id]: {
                    ...action.question
                }
            };
        case SAVE_QUESTION_ANSWER:
            return {
                ...state,
                [action.questionId]: {
                    ...state[action.questionId],
                    [action.answer]: {
                        ...state[action.questionId][action.answer],
                        votes: state[action.questionId][action.answer].votes.concat([action.userId])
                    }
                }
            };
        case RESTORE_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question
            };
        default :
            return state
    }
}