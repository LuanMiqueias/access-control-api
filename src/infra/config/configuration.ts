export default () => ({
  port: Number(process.env.DATABASE_PORT) || 3000,
  database: {
    DATABASE_URL: process?.env?.DATABASE_URL,
    DB_HOST: process?.env?.DB_HOST,
    DB_PORT: process?.env?.DB_HOST,
    DB_USER: process?.env?.DB_HOST,
    DB_PASS: process?.env?.DB_HOST,
    DB_NAME: process?.env?.DB_HOST,
  },
});
