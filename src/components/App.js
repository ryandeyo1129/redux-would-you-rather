import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';

import Navbar from './Navbar';
import Home from './Home';
import QuestionPage from './QuestionPage';
import CreateQuestion from './CreateQuestion';
import LeaderBoard from './LeaderBoard';
import Login from './Login';
import AnsweredList from './AnsweredList';
import UnansweredList from './UnansweredList';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render () {
    return (
      <Router>
        <div className="container">
          <Navbar />
          <div>
            <Route path='/' component={Home} />
            <Route path='/question/:id' component={QuestionPage} />
            <Route path='/new' component={CreateQuestion} />
            <Route path='/leaderboard' component={LeaderBoard} />
            <Route path='/login' component={Login} />
            <Route path='/unanswered' component={UnansweredList} />
            <Route path='/answered' component={AnsweredList} />
          </div>
        </div>
      </Router>
    );
  }
}

export default connect()(App);
