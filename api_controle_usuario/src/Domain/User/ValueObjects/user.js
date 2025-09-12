const Email = require('./email');
const Password = require('./password'); // Assumimos que Password já faz o hashing
const Name = require('./name');
const { v4: uuidv4 } = require('uuid');

class User {
  constructor(name, email, password, id = uuidv4()) {
    if (!id || !name || !email || !password) {
      throw new Error("User properties cannot be empty.");
    }

    this.id = id; // UUID
    this.name = new Name(name);
    this.email = new Email(email);
    // Password Value Object já lida com hashing ao ser criado
    this.password = new Password(password);
  }

  // Métodos de comportamento de domínio
  async comparePassword(plainPassword) {
    return await this.password.compare(plainPassword);
  }

  updatePassword(newPassword) {
    this.password = new Password(newPassword);
  }

  toObject() {
    return {
      id: this.id,
      name: this.name.value,
      email: this.email.value,
      password: this.password.hashedPassword // Expor o hash, não a string pura
    };
  }
}

module.exports = User;