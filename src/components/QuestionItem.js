import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatQuestion } from '../utils/helpers';
import { Link, withRouter } from 'react-router-dom';

class QuestionItem extends Component {
  render() {
    const { question } = this.props;
    const {
      name, id, avatar, optionOne, optionTwo
    } = question;

    if (question === null) {
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
          <div>
            Would you rather:
            <p>{optionOne}</p>
            OR
            <p>{optionTwo}</p>
          </div>
        </div>
        <Link to={`/question/${id}`} className='view-question'>View Poll</Link>
      </div>
    );
  }
}

function mapStateToProps ({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  console.log('test', question, id);

  return {
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null
  }
}

export default withRouter(connect(mapStateToProps)(QuestionItem));