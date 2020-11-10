import React, { Component } from 'react';
import { connect } from 'react-redux';

import Question from './Question';

class QuestionPage extends Component {
  render() {
    const { id } = this.props;
    return (
      <div>
        <Question id={id} />
      </div>
    );
  }
}

function mapStateToProps ({ authedUser, users, questions }, props) {
  const { id } = props.match.params;

  console.log(questions)

  return {
    id,
    authedUser,
    questions,
    users
  }
}

export default connect(mapStateToProps)(QuestionPage);