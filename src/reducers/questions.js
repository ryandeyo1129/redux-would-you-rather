import { RECEIVE_QUESTIONS, ADD_QUESTION, ANSWER_QUESTION } from '../actions/questions';

// fix me
export default function questions (state = {}, action) {
  console.log('testaction', action)
  switch(action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }
    case ADD_QUESTION :
      return {
        ...state,
        [action.question.id]: action.question,
      }
    case ANSWER_QUESTION :
      console.log(state[action.qid])
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          optionOne: action.hasAnswer
            ? state[action.qid].optionOne.votes.filter(uid => uid !== action.authedUser)
            : state[action.qid].optionOne.votes.concat([action.authedUser]),
          optionTwo: action.hasAnswer
            ? state[action.qid].optionTwo.votes.filter(uid => uid !== action.authedUser)
            : state[action.qid].optionTwo.votes.concat([action.authedUser])
        }
      }
    default :
      return state
  }
}