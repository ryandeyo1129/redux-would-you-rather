export function formatQuestion (question, author, authedUser) {
  const { id, timestamp, optionOne, optionTwo } = question;
  const { name, avatarURL } = author;

  const hasAnswer = optionOne.votes.includes(authedUser) || optionTwo.votes.includes(authedUser);

  return {
    name,
    id,
    timestamp,
    avatar: avatarURL,
    optionOne: optionOne.text,
    optionTwo: optionTwo.text,
    hasAnswer: hasAnswer
  }
}