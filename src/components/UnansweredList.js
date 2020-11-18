import React, { Component } from 'react';
import { connect } from 'react-redux';

import QuestionItem from './QuestionItem';

class UnansweredList extends Component {
  render () {
    const { questions } = this.props
    const questionsArray = Object.values(questions)

    const unansweredQuestions = questionsArray.filter(
      question => !(question.optionOne.votes.includes(this.props.authedUser) || question.optionTwo.votes.includes(this.props.authedUser))
    );

    return (
      <div>
        <ul>
          {unansweredQuestions.map((question) => (
            <li key={question.id}>
              <QuestionItem id={question.id} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps ({ questions }) {
  return {
    questions
  }
}

export default connect(mapStateToProps)(UnansweredList);