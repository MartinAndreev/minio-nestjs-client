import { Provider } from '@nestjs/common';
import { MINIO_CONFIG } from './constants';
import { MinioClient } from './minio-client';
import { MinioConfig } from './types';

export const createMinioServiceProvider = (): Provider => ({
  provide: MinioClient,
  inject: [MINIO_CONFIG],
  useFactory: (config: MinioConfig) => new MinioClient(config),
});
