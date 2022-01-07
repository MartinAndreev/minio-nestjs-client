import { Test } from '@nestjs/testing';
import { MinioClient, MinioModule, MINIO_CONFIG } from '../src';
import { MinioConfig } from '../src/types';

const defaultConfig = {
  endPoint: 'play.min.io',
  port: 9000,
  useSSL: true,
  accessKey: 'Q3AM3UQ867SPQQA43P2F',
  secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG',
};

describe('MinioModule', () => {
  it('should create the s3 service with the passed settings', async () => {
    const testModule = await Test.createTestingModule({
      imports: [MinioModule.forRoot(defaultConfig)],
    }).compile();

    const config = testModule.get(MINIO_CONFIG);
    const service = testModule.get(MinioClient);

    expect(config).toEqual(defaultConfig);
    expect(service).toBeInstanceOf(MinioClient);
  });

  it('should create the s3 service with the async passed settings as promise', async () => {
    const testModule = await Test.createTestingModule({
      imports: [
        MinioModule.forRootAsync({
          useFactory: () =>
            new Promise((resolve) => {
              resolve(defaultConfig);
            }),
        }),
      ],
    }).compile();

    const config = testModule.get(MINIO_CONFIG);
    const service = testModule.get(MinioClient);

    expect(config).toEqual(defaultConfig);
    expect(service).toBeInstanceOf(MinioClient);
  });

  it('should create the s3 service with the async passed settings', async () => {
    const testModule = await Test.createTestingModule({
      imports: [
        MinioModule.forRootAsync({
          useFactory: (config: MinioConfig) => config,
          inject: ['simple.config'],
          providers: [
            {
              provide: 'simple.config',
              useValue: defaultConfig,
            },
          ],
        }),
      ],
    }).compile();

    const config = testModule.get(MINIO_CONFIG);
    const service = testModule.get(MinioClient);

    expect(config).toEqual(defaultConfig);
    expect(service).toBeInstanceOf(MinioClient);
  });
});
