const messages = [
  {
    comment: 'here is your next comment',
    timeStamp: new Date(),
    userName: 'example@gmail.com',
  },
];

function createNewComment(title, comment, userName) {
  messages.push({
    title: title,
    comment: comment,
    timeStamp: new Date(),
    userName: userName,
  });
}

module.exports = {
  createNewComment,
};
