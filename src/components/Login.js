import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {
  state = {
    userId: 'sarahedo'
  };

  onChange = (e) => {
    this.setState({ userId: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch, history } = this.props
    let { from } = history.location.state || { from: { pathname: "/" } };

    dispatch(setAuthedUser(this.state.userId));
    history.replace(from);
  };

  render () {
    const { users } = this.props;
    const userArray = Object.values(users);

    console.log(this.state);

    return (
      <div className='login'>
        <h1>Would You Rather Application</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='user'>Select User:</label>
          <select onChange={this.onChange}>
            <option value='' disabled>
              Please select
            </option>
            {userArray.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
          <button
            type='submit'
            className='btn'
            disabled={this.props.loading}
          >
            Login
          </button>
        </form>
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

export default connect(mapStateToProps)(Login);