import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import {
  MockType,
  repositoryMockFactory,
} from '../core/helpers/repository-factory.mock';
import { TransferLog } from './entity/transfer-log.entity';
import { TransferLogService } from './transfer-log.service';

describe('TransferLogService', () => {
  let service: TransferLogService;
  let transferModelMock: MockType<Model<TransferLog>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransferLogService,
        {
          provide: getModelToken(TransferLog.name),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<TransferLogService>(TransferLogService);
    transferModelMock = module.get(getModelToken(TransferLog.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
