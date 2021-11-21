module.exports = {
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "root",
  "database": "test",
  "synchronize": false,
  "logging": false,
  "entities": ["dist/src/entities/**/*.entity.ts"],
  "migrations": ["dist/src/db/migrations/**/*.ts"],
  "subscribers": ["src/db/subscribers/**/*.ts"],
  "cli": {
      "entitiesDir": "src/entities",
      "migrationsDir": "src/db/migrations",
      "subscribersDir": "src/db/subscribers"
  }
}