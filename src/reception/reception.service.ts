import { Injectable } from '@nestjs/common';
import { Reception } from '../entities/reception.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ReceptionWork } from '../entities/reception-work.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReceptionService {

  constructor(
    @InjectRepository(Reception)
    private receptionRepository: Repository<Reception>,
    @InjectRepository(ReceptionWork)
    private receptionWorkRepository: Repository<ReceptionWork>,
  ) {}

  async create1(result: string) {
    const reception = new Reception();
    const work = await this.receptionWorkRepository.findOne({id: 1});
    reception.work = work;
    reception.result = result;
    const ret = await this.receptionRepository.insert(reception);
    return ret.identifiers[0].id;
  }

  findAll(): Promise<Reception[]> {
    return this.receptionRepository.find();
  }

}
