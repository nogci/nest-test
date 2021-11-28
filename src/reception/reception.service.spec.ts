import { Test, TestingModule } from '@nestjs/testing';
import { ReceptionService } from './reception.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Reception } from '../entities/reception.entity';
import { ReceptionWork } from '../entities/reception-work.entity';

describe('ReceptionService', () => {
  let service: ReceptionService;

  const createMock = jest.fn((dto: any) => {
    return dto;
  });

  const saveMock = jest.fn((dto: any) => {
    return dto;
  });

  const findMock = jest.fn(() => {
    const reception = new Reception();
    reception.result = "aaa";
    return Promise.resolve([reception]);
  });

  const MockRepository = jest.fn().mockImplementation(() => {
    return {
      create: createMock,
      save: saveMock,
      find: findMock,
    };
  });
  const mockRepository = new MockRepository();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReceptionService,
        {
          provide: getRepositoryToken(Reception),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(ReceptionWork),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ReceptionService>(ReceptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of Reception', async () => {
      //const result = ['test'];
      // const reception = new Reception();
      // const result = [reception];
      //jest.spyOn(service, 'findAll').
      // jest.spyOn(service, 'findAll').mockImplementation(() => Promise.resolve(result));

      const reception = new Reception();
      reception.result = "aaa";

      const ret = await service.findAll();
      expect(ret).toStrictEqual([reception]);
    });
  });

});
