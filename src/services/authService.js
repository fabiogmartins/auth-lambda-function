const userRepository = require('../repositories/userRepository');
const cognitoService = require('./cognitoService');
const tokenService = require('./tokenService');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.authenticate = async (cpf) => {
  let user = await userRepository.findByCpf(cpf);

  if (!cpf || !user) {
    return tokenService.generateAnonymousToken();
  }

  if (!user) {
    const hashedCpf = await bcrypt.hash(cpf, saltRounds);
    user = await cognitoService.registerUser(cpf, hashedCpf);
    await userRepository.create({ cpf, userId: user.userId, password: hashedCpf });
  }

  return tokenService.generateToken(user);
};
