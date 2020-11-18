import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { logOut } from '../actions/authedUser'

class Navbar extends Component {
  handleSubmit = (e) => {
    const { dispatch, history } = this.props;
    let { from } = { from: { pathname: "/login" } };
    
    dispatch(logOut());
    history.replace(from);
  };

  render() {
    const { users, authedUser, loading } = this.props

    if (loading) {
      return <p>loading</p>
    }

    const username = users[authedUser].name

    return (
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/' activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/add' activeClassName='active'>
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' activeClassName='active'>
              Leaderboard
            </NavLink>
          </li>
          <li>Welcome, {username}</li>
          <li>
            <form onSumbit={this.handleSubmit}>
              <button
              type='submit'
              className='btn'
            >
              Logout
            </button>
            </form>
          </li>
        </ul>
      </nav>
    )
  }
}

function mapStateToProps ({ users = {}, authedUser }) {
  return {
    users,
    authedUser,
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(Navbar);