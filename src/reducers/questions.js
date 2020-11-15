import { RECEIVE_QUESTIONS, ADD_QUESTION, ANSWER_QUESTION } from '../actions/questions';

export default function questions (state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS :
      console.log(action.questions)
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
      console.log('option1', state[action.qid].optionOne.votes.includes(action.authedUser))
      console.log('option2', state[action.qid].optionTwo.votes.includes(action.authedUser))
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          optionOne: {
            ...state[action.qid.optionOne],
            text: state[action.qid].optionOne.text,
            votes: state[action.qid].optionOne.votes.includes(action.authedUser)
              ? state[action.qid].optionOne.votes.filter(uid => uid !== action.authedUser)
              : state[action.qid].optionOne.votes.concat(action.authedUser)
          },
          optionTwo: {
            ...state[action.qid.optionTwo],
            text: state[action.qid].optionTwo.text,
            votes: state[action.qid].optionTwo.votes.includes(action.authedUser)
              ? state[action.qid].optionTwo.votes.filter(uid => uid !== action.authedUser)
              : state[action.qid].optionTwo.votes.concat(action.authedUser)
          },
        }
      }
    default :
      return state
  }
}