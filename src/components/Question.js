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

    const { dispatch, question, authedUser } = this.props
    const { answer } = this.state

    dispatch(handleAnswerQuestion({
      authedUser: authedUser,
      qid: question.id,
      answer: answer
    }))
  }
  handleChange = (e) => {
    const { question, authedUser } = this.props;
    const answer = e.target.value;

    if (answer === 'optionOne') {
      question.optionTwo.votes = question.optionTwo.votes.filter(uid => uid !== authedUser);
      question.optionOne.votes.concat(authedUser);
    } else {
      question.optionOne.votes = question.optionOne.votes.filter(uid => uid !== authedUser);
      question.optionTwo.votes.concat(authedUser);
    }
    
    this.setState({ answer })
  }
  render() {
    
    const { question, authedUser } = this.props;

    if (question === null) {
      return <p>does not exist</p>
    }

    const {
      name, avatar, optionOne, optionTwo, hasAnswer
    } = question;

    const totalVotes = optionOne.votes.length + optionTwo.votes.length;
    const optionOnePercentage = (optionOne.votes.length / totalVotes * 100).toFixed(1);
    const optionTwoPercentage = (optionTwo.votes.length / totalVotes * 100).toFixed(1);

    return (
      <div className='question'>
        <h2>Asked by {name}</h2>
        <div className='question-info'>
          <img
            src={avatar}
            className='avatar'
            alt={`Avatar of ${name}`}
          />
          {!hasAnswer
            ? <form onSubmit={this.handleAnswer}>
                Would you rather:
                <div>
                  <input type='radio' id='optionOne' name='pollOption' onChange={this.handleChange} value='optionOne' />
                  <label htmlFor='optionOne'>{optionOne.text}</label>
                </div>
                <div>
                  <input type='radio' id='optionTwo' name='pollOption' onChange={this.handleChange} value='optionTwo' />
                  <label htmlFor='optionTwo'>{optionTwo.text}</label>
                </div>
                <button
                  className='btn'
                  type='submit'
                  disabled={this.state.answer === ''}
                >
                  Submit
                </button>
              </form>
            : <div>
                <div>
                  {optionOne.text} - ( {optionOne.votes.length} of {totalVotes} votes ) - ( {optionOnePercentage} %)
                  {optionOne.votes.includes(authedUser) ? ' - YOU VOTED FOR THIS' : ''}
                </div>
                <div>
                  {optionTwo.text} - ( {optionTwo.votes.length} of {totalVotes} votes ) - ( {optionTwoPercentage} %)
                  {optionTwo.votes.includes(authedUser) ? ' - YOU VOTED FOR THIS' : ''}
                </div>
              </div>
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps ({ authedUser, users, questions }, { id }) {
  const question = questions[id];

  return {
    users,
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null
  }
}

export default connect(mapStateToProps)(Question);