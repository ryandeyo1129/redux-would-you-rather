import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatQuestion } from '../utils/helpers';
import { handleAnswerQuestion } from '../actions/questions';

class Question extends Component {
  handleAnswer = (e) => {
    e.preventDefault();

    const { dispatch, question, authedUser } = this.props

    dispatch(handleAnswerQuestion({
      authedUser: authedUser,
      qid: question.id,
    }))
  }
  render() {
    const { question } = this.props;
    const {
      name, avatar, optionOne, optionTwo
    } = question;

    if (question === null) {
      console.log('null question')
      return <p>does not exist</p>
    }

    return (
      <div className='question'>
        <h2>Asked by {name}</h2>
        <div className='question-info'>
          <img
            src={avatar}
            className='avatar'
          />
          <form>
            Would you rather:
            <input type='radio'>{optionOne}</input>
            OR
            <input type='radio'>{optionTwo}</input>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps ({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  console.log('test', question, id);
  console.log('questions', questions);

  return {
    authedUser,
    questions,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null
  }
}

export default connect(mapStateToProps)(Question);