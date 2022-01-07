<div align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="300" alt="Nest Logo" />
  </a>
</div>

<h3 align="center">NestJS Minio Client</h3>

<div align="center">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://img.shields.io/badge/built%20with-NestJs-red.svg" alt="Built with NestJS">
  </a>

![main](https://github.com/MartinAndreev/minio-nestjs-client/actions/workflows/test.yml/badge.svg?branch=main)

</div>

This is a really simple NestJS module, that lets you initialize the [minio client](https://docs.min.io/docs/javascript-client-api-reference.html)
in a NestJS friendly way and provides a handy way to inject the client.

## Change Log

See [Changelog](CHANGELOG.md) for more information.

## Authors

- **Martin Andreev <martin.andreev92@gmail.com>**

## License

Licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Installation

To install the module simple run

```bash
npm install minio-nestjs-client
```

or

```bash
yarn add minio-nestjs-client
```

## Usage

As this is a simple wrapper usage is pretty straigth forward. Just import the MinioModule and initialize it.
There are two ways to do this, a simple config and async config.

To use the simple config just:

```typescript
import { MinioModule } from 'minio-nestjs-client';

MinioModule.forRoot({
  endPoint: 'play.min.io',
  port: 9000,
  useSSL: true,
  accessKey: 'Q3AM3UQ867SPQQA43P2F',
  secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG',
});
```

However, there are times, where configuration if loaded from a service or depends on other providers. This can be achived using the `MinioModule.forRootAsync`.

```typescript
import { MinioModule } from 'minio-nestjs-client';

MinioModule.forRootAsync({
  useFactory: () =>
    new Promise((resolve) => {
      resolve({
        endPoint: 'play.min.io',
        port: 9000,
        useSSL: true,
        accessKey: 'Q3AM3UQ867SPQQA43P2F',
        secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG',
      });
    }),
});
```

Here is also an example, that uses the `@nestjs/config`.

```typescript
import { MinioModule, MinioConfig } from 'minio-nestjs-client';

MinioModule.forRootAsync({
  useFactory: (config) => {
    return config.get<MinioConfig>('config-key');
  },
  inject: [ConfigService],
  import: [ConfigModule],
});
```

And to access the client just use the Injection token

```typescript
import { MINIO_CLIENT, MinioClient } from 'minio-nestjs-client';

@Injectable()
export class MyService {
  public constructor(private readonly client: MinioClient) {}

  public async doSomethingWithABucket(): Promise<string> {
    const bucketExists = await this.client.bucketExists('test');

    return bucketExists ? 'We have a bucket' : 'We dont have a bucket';
  }
}
```

## Development

1. Clone the repo
2. Run yarn install

```bash
cd minio-nestjs-client
yarn install
```

## Running tests

```bash
yarn test
```
