module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './db/database.sqlite'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './migrations'
    }
  },
  production: {
    client: 'sqlite3',
    connection: {
      filename: process.env.DB_PATH || './db/database.sqlite'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './migrations'
    }
  }
};
