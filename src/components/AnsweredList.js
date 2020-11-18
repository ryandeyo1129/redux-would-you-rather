import React, { Component } from 'react';
import { connect } from 'react-redux';

import QuestionItem from './QuestionItem';

class AnsweredList extends Component {
  render () {
    const { questions } = this.props
    const questionsArray = Object.values(questions)

    const answeredQuestions = questionsArray.filter(
      question => (question.optionOne.votes.includes(this.props.authedUser) || question.optionTwo.votes.includes(this.props.authedUser))
    );

    return (
      <div>
        <ul>
          {answeredQuestions.map((question) => (
            <li key={question.id}>
              <QuestionItem id={question.id} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps ({ questions = {}, authedUser }) {
  return {
    questions,
    authedUser
  }
}

export default connect(mapStateToProps)(AnsweredList);