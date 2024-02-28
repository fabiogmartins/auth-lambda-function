const authService = require('../services/authService');

exports.handler = async (event) => {
  try {
    const cpf = event.cpf;  // Ajuste conforme a estrutura do evento
    const token = await authService.authenticate(cpf);
    return {
      statusCode: 200,
      body: JSON.stringify({ token }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro ao processar autenticação' }),
    };
  }
};
