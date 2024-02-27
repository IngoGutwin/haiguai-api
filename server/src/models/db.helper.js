function createErrorMessage(postResult) {
  console.table(postResult);
  if (postResult.message.includes('username')) {
    postResult.message = 'username already exist';
  } else if (postResult.message.includes('email')) {
    postResult.message = 'email-address already exist';
  }
  return postResult;
}

module.exports = {
  createErrorMessage,
};
