class userInput {
  constructor(user) {
    this.user = {
      id: user.id,
      name: user.name,
      email: user.email
    };
  }
}

module.exports = userInput;