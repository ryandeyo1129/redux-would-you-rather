import { saveQuestion, saveQuestionAnswer } from '../utils/api';

export const ADD_QUESTION = 'ADD_QUESTION';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

function answerQuestion({ id, authedUser, answer }) {
  return {
    type: ANSWER_QUESTION,
    id,
    authedUser,
    answer
  }
}

export function handleAddQuestion (text1, text2) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    return saveQuestion({
      text1,
      text2,
      author: authedUser
    })
      .then(question => dispatch(addQuestion(question)))
  }
}

export function handleAnswerQuestion (info) {
  return (dispatch) => {
    dispatch(answerQuestion(info))

    return saveQuestionAnswer(info)
      .catch(e => {
        console.warn('error in handleAnswerQuestion: ', e);
        dispatch(answerQuestion(info));
        alert('error when answering question')
      })
  }
}