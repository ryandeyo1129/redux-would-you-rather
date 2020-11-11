import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatQuestion } from '../utils/helpers';
import { handleAnswerQuestion } from '../actions/questions';

class Question extends Component {
  state = {
    answer: ''
  }

  handleAnswer = (e) => {
    e.preventDefault();

    console.log(e.target.value);

    const { dispatch, question, authedUser } = this.props
    const { answer } = this.state

    console.log(answer)

    dispatch(handleAnswerQuestion({
      authedUser: authedUser,
      qid: question.id,
      answer: answer
    }))
  }
  handleChange = (e) => {
    const answer = e.target.id

    console.log(e.target.id)

    this.setState(() => ({
      answer
    }))
  }
  render() {
    
    const { question } = this.props;

    if (question === null) {
      console.log('null question')
      return <p>does not exist</p>
    }

    const {
      name, avatar, optionOne, optionTwo
    } = question;

    return (
      <div className='question'>
        <h2>Asked by {name}</h2>
        <div className='question-info'>
          <img
            src={avatar}
            className='avatar'
          />
          <form onSubmit={this.handleAnswer}>
            Would you rather:
            <div>
              <input type='radio' id='optionOne' name='pollOption' onChange={this.handleChange} value={optionOne} />
              <label htmlFor='optionOne'>{optionOne}</label>
            </div>
            <div>
              <input type='radio' id='optionTwo' name='pollOption' onChange={this.handleChange} value={optionTwo} />
              <label htmlFor='optionTwo'>{optionTwo}</label>
            </div>
            <button
              className='btn'
              type='submit'
              // disabled={!value}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps ({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  console.log('test', question, id);
  // console.log('questions', questions);

  return {
    authedUser,
    // questions,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null
  }
}

export default connect(mapStateToProps)(Question);