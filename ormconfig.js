module.exports = {
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "root",
  "database": "test",
  "synchronize": false,
  "logging": true,
  "entities": ["dist/entities/**/*.entity.{ts,js}"],
  "migrations": ["dist/db/migrations/**/*.{ts,js}"],
  "subscribers": ["dist/db/subscribers/**/*.{ts,js}"],
  "cli": {
      "entitiesDir": "src/entities",
      "migrationsDir": "src/db/migrations",
      "subscribersDir": "src/db/subscribers"
  }
}