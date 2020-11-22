module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  logging: false,
  logger: 'file',
  synchronize: true,
  entities: ['dist/entities/*.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations'
  }
};
