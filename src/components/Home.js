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
      <div>
        <ListNav />
        <Route path='/unanswered' component={UnansweredList} />
        <Route path='/answered' component={AnsweredList} />
      </div>
    );
  }
}

export default Home;