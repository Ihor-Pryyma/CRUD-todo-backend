
module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/my_life'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }
};

