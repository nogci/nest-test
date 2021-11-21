import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ReceptionModule } from './reception/reception.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot( 
      // {
      // type: 'mysql',
      // host: 'localhost',
      // port: 3306,
      // username: 'root',
      // password: 'root',
      // database: 'test',
      // "synchronize": false,
      // "logging": false,
      // "entities": ["src/entities/**/*.ts"],
      // "migrations": ["src/db/migrations/**/*.ts"],
      // "subscribers": ["src/db/subscribers/**/*.ts"],
      // "cli": {
      //     "entitiesDir": "src/entities",
      //     "migrationsDir": "src/db/migrations",
      //     "subscribersDir": "src/db/subscribers"
      //   }
      // } 
    ),
    UserModule, 
    ReceptionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
