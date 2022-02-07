import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { grpcClientOptions } from './grpc-client.options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  grpcClientOptions.options['url'] = process.env.GRPC_CONNECTION_URL_ACCESSORIES;

  app.connectMicroservice<MicroserviceOptions>(grpcClientOptions);

  await app.startAllMicroservices();
  await app.listen(process.env.PORT);
  console.log(`Application Accessories is running on: ${await app.getUrl()}`);
}
bootstrap();