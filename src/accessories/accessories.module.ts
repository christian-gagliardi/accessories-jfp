import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientOptions } from '../grpc-client.options';
import { AccessoriesController } from './accessories.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ACCESSORIES_PACKAGE',
        ...grpcClientOptions,
      },
    ]),
  ],
  controllers: [AccessoriesController],
})
export class AccessoriesModule {}