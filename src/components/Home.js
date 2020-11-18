import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

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
    const { authedUser } = this.props
    
    if (authedUser === null) {
      return <Redirect to='/login' />;
    }

    return (
      <div>
        {window.location.pathname === '/' || window.location.pathname === '/unanswered' || window.location.pathname === '/answered'
          ? <ListNav />
          : null
        }
        {window.location.pathname === '/'
          ? <Redirect to='/unanswered' />
          : null
        }
      </div>
    );
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(Home);