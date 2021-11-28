import { Test, TestingModule } from '@nestjs/testing';
import { ReceptionController } from './reception.controller';
import { ReceptionService } from './reception.service';
import { Reception } from '../entities/reception.entity';

describe('ReceptionController', () => {
  let controller: ReceptionController;
  const reception = new Reception();
  reception.result = "aaa";
  //let receptionService = { findAll: () => Promise.resolve([reception]) };

  const findMock = jest.fn(() => {
    const reception = new Reception();
    reception.result = "aaa";
    return Promise.resolve([reception]);
  });

  const MockService = jest.fn().mockImplementation(() => {
    return {
      findAll: findMock,
    };
  });
  const mockService = new MockService();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceptionController],
      providers: [ReceptionService],
    })
    .overrideProvider(ReceptionService)
    .useValue(mockService)
    .compile();

    controller = module.get<ReceptionController>(ReceptionController);
  });

  describe('findAll', () => {
    it('should return an array of Reception', async () => {
      //const result = ['test'];
      // const reception = new Reception();
      // const result = [reception];
      //jest.spyOn(service, 'findAll').
      // jest.spyOn(service, 'findAll').mockImplementation(() => Promise.resolve(result));

      const ret = await controller.findAll();
      expect(ret).toStrictEqual([reception]);
    });
  });

  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });
});
