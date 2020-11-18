import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Redirect } from 'react-router-dom';

import LeaderboardItem from './LeaderboardItem';

class Leaderboard extends Component {
  render () {
    const { users, authedUser } = this.props;

    const userArray = Object.values(users);

    userArray.forEach(user => {
      user.score = Object.values(user.answers).length + user.questions.length;
      console.log(user)
    })

    if (authedUser === null) {
      return <Redirect to='/login' />;
    }

    return (
      <div>
        <h1>Leaderboard</h1>
        <ul>
          {_.orderBy(userArray, 'score', 'desc').map(user => (
            <li key={user.id}>
              <LeaderboardItem id={user.id} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps ({ users, authedUser }) {
  return {
    users,
    authedUser
  }
}

export default connect(mapStateToProps)(Leaderboard);