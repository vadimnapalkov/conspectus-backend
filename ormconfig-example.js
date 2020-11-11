module.exports = {
  type: 'postgres',
  host: 'your_host',
  username: 'your_username',
  password: 'your_password',
  database: 'your_database',
  logging: true,
  logger: 'file',
  migrationsRun: true,
  entities: ['dist/entities/*.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations'
  }
};
