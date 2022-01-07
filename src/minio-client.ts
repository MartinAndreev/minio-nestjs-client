import { Injectable } from '@nestjs/common';
import { Client } from 'minio';

@Injectable()
export class MinioClient extends Client {}
