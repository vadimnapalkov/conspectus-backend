module.exports = {
  name: 'default',
  type: 'postgres',
  url: process.env.PG_URL,
  synchronize: true,
  entities: ['dist/entities/*.js'],
  cli: {
    entitiesDir: 'src/entities'
  },
  extra: {
    ssl: true
  }
};
