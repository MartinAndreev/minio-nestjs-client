import { Abstract, ModuleMetadata, Type } from '@nestjs/common';
import { ClientOptions } from 'minio';

export type MinioConfig = ClientOptions;

export type MinioAsyncConfig = Pick<ModuleMetadata, 'imports' | 'providers'> & {
  useFactory: (...args: any[]) => Promise<ClientOptions> | ClientOptions;
  inject?: Array<Type<unknown> | string | symbol | Abstract<unknown>>;
};
