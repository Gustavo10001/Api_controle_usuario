const IUserRepository = require('src/Domain/Repositories/IUserRepository');
const UserModel = require('./Models').User;
const User = require('src/Domain/User/User');

class SequelizeUserRepository extends IUserRepository {
async save(user) {
  const createdUser = await UserModel.create({
    name: user.name,
    email: user.email,
    password: user.password
  });

  return new User(
    createdUser.name,
    createdUser.email,
    createdUser.password,
    createdUser.id 
  );
}



    async findById(id) {
        const userData = await UserModel.findByPk(id);
        if (!userData) return null;
        
        return new User(
            userData.name,
            userData.email,
            userData.password, 
            userData.id
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
            userData.id
        );
    }
}

module.exports = SequelizeUserRepository;