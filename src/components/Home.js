import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ListNav from './ListNav';
import AnsweredList from './AnsweredList';
import UnansweredList from './UnansweredList';

class Home extends Component {
  state = {
    list: 'unanswered'
  }

  handleClick = (selection) => {
    this.setState({
      list: selection
    })
  };

  render () {
    return (
      <Router>
        <ListNav />
        <div>
          <Route path='/unanswered' component={UnansweredList} />
          <Route path='/answered' component={AnsweredList} />
        </div>
      </Router>
    );
  }
}

export default Home;