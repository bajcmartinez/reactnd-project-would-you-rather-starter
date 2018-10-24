import { hideLoading, showLoading } from "./loading";
import * as api from "../api";
import { userAnswered, userAsked } from "./auth";

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SAVE_QUESTION = 'SAVE_QUESTION';
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER';
export const RESTORE_QUESTION = 'RESTORE_QUESTION';

export function receiveQuestions (questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

export function saveQuestion (question) {
    return {
        type: SAVE_QUESTION,
        question,
    }
}

export function restoreQuestion (question) {
    return {
        type: RESTORE_QUESTION,
        question,
    }
}

export function saveQuestionAnswer (userId, questionId, answer) {
    return {
        type: SAVE_QUESTION_ANSWER,
        userId,
        questionId,
        answer,
    }
}

export const handleLoadQuestions = () => (dispatch) => {
    dispatch(showLoading());
    return api.getQuestions().then((questions) => {
        dispatch(hideLoading());
        dispatch(receiveQuestions(questions));
    });
};

export const handleSaveQuestion = (question) => (dispatch) => {
    return api.saveQuestion(question).then((question) => {
        dispatch(saveQuestion(question));
        dispatch(userAsked(question));
    });
};

export const handleSaveQuestionAnswer = (userId, question, answer) => (dispatch) => {
    dispatch(saveQuestionAnswer(userId, question.id, answer));
    return api.saveQuestionAnswer({ authedUser: userId, qid: question.id, answer }).then(() => {
        dispatch(userAnswered(question.id, answer));
    }).catch((error) => {
        console.warn("Error saving the answer: ", error);
        // If something goes wrong restore the question as it was
        dispatch(restoreQuestion(question));
    });
};
