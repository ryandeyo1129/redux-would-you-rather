import React, { Component } from 'react';
import { connect } from 'react-redux';

class LeaderboardItem extends Component {
  render() {
    const { user } = this.props;

    const {
      name, avatarURL, answers, questions
    } = user;

    const answersNum = Object.values(answers).length;
    const questionsNum = questions.length
    const totalScore = answersNum + questionsNum

    return (
      <div className='question'>
        <h2>{name}</h2>
        <div className='question-info'>
          <img
            src={avatarURL}
            className='avatar'
            alt={`Avatar of ${name}`}
          />
          <div>
            <p>Answers - {answersNum}</p>
            <p>Questions - {questionsNum}</p>
            <p>Total Score - {totalScore}</p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps ({ authedUser, users }, { id }) {
  const user = users[id];

  console.log(users)

  return {
    user
  }
}

export default connect(mapStateToProps)(LeaderboardItem);