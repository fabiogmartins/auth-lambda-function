const AWS = require('aws-sdk');
const config = require('../config');

const cognito = new AWS.CognitoIdentityServiceProvider({ region: config.aws.region });

exports.registerUser = async (cpf, password) => {
  const userPoolId = process.env.USER_POOL_ID;
  const params = {
    UserPoolId: userPoolId,
    Username: cpf,
    TemporaryPassword: password,
    UserAttributes: [
      {
        Name: 'custom:cpf',
        Value: cpf
      },
    ],
    MessageAction: 'SUPPRESS',
  };

  try {
    await cognito.adminCreateUser(params).promise();
    return { cpf, userId: cpf };  // Em Cognito, Username pode servir como userId
  } catch (error) {
    console.error(error);
    throw new Error('Erro ao registrar usuário no Cognito');
  }
};
