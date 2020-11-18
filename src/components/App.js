import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';

import Navbar from './Navbar';
import Home from './Home';
import QuestionPage from './QuestionPage';
import CreateQuestion from './CreateQuestion';
import Leaderboard from './Leaderboard';
import Login from './Login';
import AnsweredList from './AnsweredList';
import UnansweredList from './UnansweredList';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render () {
    const { authedUser } = this.props
    return (
      <Router>
        <div className="container">
          {window.location.pathname === '/login' || authedUser === null
            ? null
            : <Navbar />
          }
          <div>
            <Route path='/login' component={Login} />
            <Route path='/' component={Home} />
            <Route path='/question/:id' component={QuestionPage} />
            <Route path='/add' component={CreateQuestion} />
            <Route path='/leaderboard' component={Leaderboard} />
            <Route path='/unanswered' component={UnansweredList} />
            <Route path='/answered' component={AnsweredList} />
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(App);
