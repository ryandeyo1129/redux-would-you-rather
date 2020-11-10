import React, { Component } from 'react';
import { connect } from 'react-redux';

import QuestionItem from './QuestionItem';

class AnsweredList extends Component {
  render () {
    return (
      <div>
        <ul>
          {this.props.questionIds.map((id) => (
            <li key={id}>
              <QuestionItem id={id} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps ({ questions }) {
  return {
    questionIds: Object.keys(questions)
  }
}

export default connect(mapStateToProps)(AnsweredList);