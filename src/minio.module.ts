import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { MINIO_CONFIG } from './constants';
import { createMinioServiceProvider } from './minio-client-service.factory';
import { MinioAsyncConfig, MinioConfig } from './types';

const proviers: Provider[] = [createMinioServiceProvider()];

const createSharedProviders = (config: MinioConfig): Provider[] => [
  {
    provide: MINIO_CONFIG,
    useValue: config,
  },
  ...proviers,
];

const createSharedProvidersAsync = (provider: MinioAsyncConfig): Provider[] => [
  {
    provide: MINIO_CONFIG,
    useFactory: provider.useFactory,
    inject: provider.inject || [],
  },
  ...proviers,
];

@Global()
@Module({
  imports: [],
})
export class MinioModule {
  static forRoot(config: MinioConfig): DynamicModule {
    return {
      module: MinioModule,
      global: true,
      providers: [...createSharedProviders(config)],
      exports: [...createSharedProviders(config)],
      imports: [],
    };
  }

  static forRootAsync(provider: MinioAsyncConfig): DynamicModule {
    return {
      module: MinioModule,
      global: true,
      providers: [...createSharedProvidersAsync(provider), ...(provider.providers || [])],
      imports: [...(provider.imports || [])],
      exports: [...createSharedProvidersAsync(provider)],
    };
  }
}
