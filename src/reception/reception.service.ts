import { Injectable, ConflictException, RequestTimeoutException } from '@nestjs/common';
import { Reception } from '../entities/reception.entity';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { ReceptionWork } from '../entities/reception-work.entity';
import { Repository, Connection, QueryRunner } from 'typeorm';

@Injectable()
export class ReceptionService {

  private lockStringPrefix: string = "Reception";

  constructor(
    @InjectRepository(Reception)
    private receptionRepository: Repository<Reception>,
    @InjectRepository(ReceptionWork)
    private receptionWorkRepository: Repository<ReceptionWork>,
    @InjectConnection()
    private readonly connection: Connection,
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

  async one(id: number): Promise<Reception> {
    return this.receptionRepository.findOne(id);
  }

  async update2(id: number, data: Partial<Reception>): Promise<void> {
    const origin = await this.receptionRepository.findOne(id);
    const updateData = Object.assign(origin, data); // 上書き
    this.receptionRepository.save(updateData);
  }

  async updateNoLock(id: number, data: Partial<Reception>): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const origin = await queryRunner.manager.findOne(Reception, id);
      const updateData = Object.assign(origin, data); // 上書き
      await queryRunner.manager.save(updateData);
      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async update(id: number, data: Partial<Reception>): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      //test lock
      const freeLockString: string = "IS_FREE_LOCK('" + this.lockStringPrefix + String(id) + "')";
      const lockret = await queryRunner.manager.query("SELECT " + freeLockString);
      console.log(lockret);
      console.log(lockret[0]);
      let ret2 = await this.isFreeLock(queryRunner, this.lockStringPrefix + String(id));
      console.log(ret2);
      ret2 = await this.getLock(queryRunner, this.lockStringPrefix + String(id));
      console.log(ret2);
      ret2 = await this.releaseLock(queryRunner, this.lockStringPrefix + String(id));
      console.log(ret2);
      

      // const origin = await queryRunner.manager.findOne(Reception, id);
      const origin = await queryRunner.manager
        .getRepository(Reception)
        .createQueryBuilder('reception')
        .useTransaction(true)
        .setLock('pessimistic_write')
        .where('reception.id = :id', { id: id })
        .getOne();
      const updateData = Object.assign(origin, data); // 上書き
      await queryRunner.manager.save(updateData);
      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async isFreeLock(queryRunner: QueryRunner, lockString: string): Promise<boolean> {
    const freeLockString: string = "IS_FREE_LOCK('" + lockString + "')";
    const ret = await queryRunner.manager.query("SELECT " + freeLockString);
    return ret[0][freeLockString] == '1';
  }

  async getLock(queryRunner: QueryRunner, lockString: string): Promise<boolean> {
    const waittime = 5;
    const queryString: string = "GET_LOCK('" + lockString + "', " + waittime + ")";
    const ret = await queryRunner.manager.query("SELECT " + queryString);
    console.log(ret);
    if (ret[0][queryString] != '1') {
      throw new RequestTimeoutException();
    }
    return ret[0][queryString] == '1';
  }

  async releaseLock(queryRunner: QueryRunner, lockString: string): Promise<boolean> {
    const queryString: string = "RELEASE_LOCK('" + lockString + "')";
    const ret = await queryRunner.manager.query("SELECT " + queryString);
    console.log(ret);
    if (ret[0][queryString] != '1') {
      throw new ConflictException();
    }
    return ret[0][queryString] == '1';
  }


}
