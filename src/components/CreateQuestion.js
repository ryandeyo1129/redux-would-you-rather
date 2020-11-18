import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/questions';
import { Redirect } from 'react-router-dom';

class CreateQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false,
  }

  handleChange1 = (e) => {
    const optionOneText = e.target.value;
    
    this.setState(() => ({
      optionOneText
    }));
  }
  handleChange2 = (e) => {
    const optionTwoText = e.target.value;
    
    this.setState(() => ({
      optionTwoText
    }));
  }
  handleSubmit = (e) => {
    e.preventDefault();

    const { optionOneText, optionTwoText } = this.state;
    const { dispatch, id } = this.props;

    dispatch(handleAddQuestion(optionOneText, optionTwoText, id));

    this.setState(() => ({
      optionOneText: '',
      optionTwoText: '',
      toHome: id ? false : true
    }))
  }

  render() {
    const { optionOneText, optionTwoText, toHome } = this.state;
    const { authedUser } = this.props;

    if (authedUser === null) {
      return <Redirect to='/login' />;
    }

    if (toHome) {
      return <Redirect to='/unanswered' />;
    }

    return (
      <div className='new-question'>
        <h3>Create New Question</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="scenario 1"
            value={optionOneText}
            onChange={this.handleChange1}
          />
          <span>OR</span>
          <input
            placeholder="scenario 2"
            value={optionTwoText}
            onChange={this.handleChange2}
          />
          <button
            className='btn'
            type='submit'
            disabled={optionOneText === '' || optionTwoText === ''}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps ({ authedUser }, { id }) {
  return {
    authedUser,
    id
  }
}

export default connect(mapStateToProps)(CreateQuestion);