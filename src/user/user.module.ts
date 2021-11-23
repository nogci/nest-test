import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Reception } from '../entities/reception.entity';
import { ReceptionWork } from '../entities/reception-work.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Reception, ReceptionWork])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
