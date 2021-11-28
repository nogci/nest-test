import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Reception } from '../entities/reception.entity';
import { ReceptionWork } from '../entities/reception-work.entity';
import { Repository } from 'typeorm';



describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
      imports: [TypeOrmModule.forFeature([User, Reception, ReceptionWork])]
    })
    .useMocker((token) => {
      if (token === UserService) {
        return { findAll: jest.fn().mockResolvedValue([]) };
      }
      // if (typeof token === 'function') {
      //   const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
      //   const Mock = moduleMocker.generateFromMetadata(mockMetadata);
      //   return new Mock();
      // }
    })
    .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
