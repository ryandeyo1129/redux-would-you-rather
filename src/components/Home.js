import React, { Component } from 'react';

import ListNav from './ListNav';

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
      </div>
    );
  }
}

export default Home;