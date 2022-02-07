import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: null, 
    package: 'accessories',
    protoPath: join(__dirname, './accessories/accessories.proto'),
  },
};