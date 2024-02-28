const authService = require('../src/services/authService');
const userRepository = require('../src/repositories/userRepository');
const cognitoService = require('../src/services/cognitoService');
const tokenService = require('../src/services/tokenService');

// Mocking das dependências
jest.mock('../src/repositories/userRepository');
jest.mock('../src/services/cognitoService');
jest.mock('../src/services/tokenService');

describe('AuthService', () => {
  it('should generate an anonymous token if no CPF is provided', async () => {
    const token = "anonymousToken";
    tokenService.generateAnonymousToken.mockReturnValue(token);

    const result = await authService.authenticate(null);
    expect(result).toBe(token);
    expect(tokenService.generateAnonymousToken).toHaveBeenCalled();
  });

  it('should register and generate a token for a new user', async () => {
    const cpf = "12345678900";
    const newUser = { cpf, userId: cpf, password: 'hashedPassword' };
    const token = "userToken";

    userRepository.findByCpf.mockResolvedValue(null);
    userRepository.create.mockResolvedValue(newUser);
    cognitoService.registerUser.mockResolvedValue(newUser);
    tokenService.generateToken.mockReturnValue(token);

    const result = await authService.authenticate(cpf);
    expect(result).toBe(token);
    expect(userRepository.findByCpf).toHaveBeenCalledWith(cpf);
    expect(cognitoService.registerUser).toHaveBeenCalledWith(cpf, expect.any(String));
    expect(userRepository.create).toHaveBeenCalledWith(newUser);
    expect(tokenService.generateToken).toHaveBeenCalledWith(newUser);
  });
});
