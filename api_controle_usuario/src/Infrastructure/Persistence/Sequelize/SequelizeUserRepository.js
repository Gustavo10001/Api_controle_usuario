const IUserRepository = require('src/Domain/Repositories/IUserRepository');
const UserModel = require('./models').User;
const User = require('../../../Domain/User/ValueObjects/user');

class SequelizeUserRepository extends IUserRepository {
async save(user) {
  const createdUser = await UserModel.create({
    name: user.name.value,
    email: user.email.value,
    password: user.password.hashedPassword
  });

  // Recria entidade a partir do que foi persistido
  return new User(
    createdUser.name,
    createdUser.email,
    createdUser.password,
    createdUser.id,
    true // indica que a senha já está hasheada
  );
}



    async findById(id) {
        const userData = await UserModel.findByPk(id);
        if (!userData) return null;
        
        return new User(
            userData.name,
            userData.email,
            userData.password,
            userData.id,
            true
        );
    }

    async findByEmail(email) {
        const userData = await UserModel.findOne({ 
            where: { email } 
        });
        if (!userData) return null;
        
        return new User(
            userData.name,
            userData.email,
            userData.password,
            userData.id,
            true
        );
    }
}

module.exports = SequelizeUserRepository;