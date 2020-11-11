export function formatQuestion (question, author, authedUser) {
  const { id, timestamp, optionOne, optionTwo } = question;
  const { name, avatarURL } = author;

  console.log(optionOne)

  const hasAnswer = optionOne.includes(authedUser) || optionTwo.votes.includes(authedUser)

  console.log(hasAnswer);

  return {
    name,
    id,
    timestamp,
    avatar: avatarURL,
    optionOne: optionOne.text,
    optionTwo: optionTwo.text,
    optionOneVotes: optionOne.length,
    optionTwoVotes: optionTwo.length,
    hasAnswer: hasAnswer
  }
}