const { Pool } = require('pg');
const config = require('../config');

const pool = new Pool(config.database);

exports.findByCpf = async (cpf) => {
  const result = await pool.query('SELECT * FROM users WHERE cpf = $1', [cpf]);
  return result.rows[0];
};

exports.create = async (user) => {
  const result = await pool.query('INSERT INTO users (cpf, user_id, password) VALUES ($1, $2, $3) RETURNING *', [user.cpf, user.userId, user.password]);
  return result.rows[0];
};
