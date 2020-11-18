import { saveQuestion, saveQuestionAnswer } from '../utils/api';

export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_VOTE = 'ADD_VOTE';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';

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

function answerQuestion ({ authedUser, qid, answer }) {
  return {
    type: ANSWER_QUESTION,
    qid,
    authedUser,
    answer
  }
}

export function handleAddQuestion (optionOneText, optionTwoText, id) {
  return (dispatch, getState) => {
    const { authedUser, users } = getState();

    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    })
      .then(question => {
        users[authedUser].questions.push(question.id);
        dispatch(addQuestion(question))
      })
  }
}

export function handleAnswerQuestion (info) {
  return (dispatch, getState) => {
    const { authedUser, users } = getState();
    dispatch(answerQuestion(info))

    return saveQuestionAnswer(info)
      .then(() => {
        users[authedUser].answers[info.qid] = info.answer
      })
      .catch(e => {
        console.warn('error in handleAnswerQuestion: ', e);
        dispatch(answerQuestion(info));
        alert('error when answering question')
      })
  }
}