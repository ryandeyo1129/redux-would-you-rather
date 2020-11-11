import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/questions';
import { Redirect } from 'react-router-dom';

class CreateQuestion extends Component {
  state = {
    text1: '',
    text2: ''
  }

  handleChange1 = (e) => {
    const text1 = e.target.value
    
    this.setState(() => ({
      text1
    }))
  }
  handleChange2 = (e) => {
    const text2 = e.target.value
    
    this.setState(() => ({
      text2
    }))
  }
  handleSubmit = (e) => {
    e.preventDefault();

    const { text1, text2 } = this.state;
    const { dispatch, id } = this.props;

    dispatch(handleAddQuestion(text1, text2, id));

    console.log('Would you rather: ', text1, ' or ', text2);

    this.setState(() => ({
      text: '',
      toHome: id ? false : true
    }))
  }

  render() {
    const { text1, text2, toHome } = this.state

    if (toHome) {
      return <Redirect to='/' />
    }

    return (
      <div className='new-question'>
        <h3>Create New Question</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="scenario 1"
            value={text1}
            onChange={this.handleChange1}
          />
          <span>OR</span>
          <input
            placeholder="scenario 2"
            value={text2}
            onChange={this.handleChange2}
          />
          <button
            className='btn'
            type='submit'
            disabled={text1 === '' || text2 === ''}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(CreateQuestion);