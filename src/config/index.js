module.exports = {
    aws: {
      region: process.env.AWS_REGION || 'us-east-1',
    },
    database: {
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    },
    jwtSecret: process.env.JWT_SECRET,
  };
  