import { Module } from '@nestjs/common';
import { ReceptionController } from './reception.controller';
import { ReceptionService } from './reception.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reception } from '../entities/reception.entity';
import { ReceptionWork } from '../entities/reception-work.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reception, ReceptionWork])],
  controllers: [ReceptionController],
  providers: [ReceptionService],
})
export class ReceptionModule {}
