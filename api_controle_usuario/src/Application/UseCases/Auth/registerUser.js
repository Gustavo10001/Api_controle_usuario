const User = require('../../../Domain/User/ValueObjects/user');
const UserInput = require('../../DTOs/userInput');
const UserAlreadyExistsException = require('src/Domain/Exceptions/UserAlreadyExistsException');

class RegisterUser {
  constructor(userRepository) {
    this.userRepository = userRepository; // IUserRepository
  }

  async execute(input) { // input é RegisterUserInput
    const existingUser = await this.userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new UserAlreadyExistsException('User with this email already exists.');
    }

    const user = new User(input.name, input.email, input.password);

    const savedUser = await this.userRepository.save(user);

    return new UserInput( {
      id: savedUser.id,
      name: savedUser.name.value,
      email: savedUser.email.value
    });
  }
}

module.exports = RegisterUser;