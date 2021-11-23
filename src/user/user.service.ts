import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReceptionWork } from 'src/entities/reception-work.entity';
import { Reception } from 'src/entities/reception.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Reception)
    private receptionRepository: Repository<Reception>,
    @InjectRepository(ReceptionWork)
    private receptionWorkRepository: Repository<ReceptionWork>,
  ) {}
  
  create2(createUserDto: CreateUserDto) {
    const user = new User("aaa", "string");
    return this.usersRepository.insert(user);
  }
  async create(createUserDto: CreateUserDto) {
    const reception = new Reception();
    const work = await this.receptionWorkRepository.findOne({id: 1});
    reception.work = work;
    reception.result = '';
    const ret = await this.receptionRepository.insert(reception);
    return ret.identifiers[0].id;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
