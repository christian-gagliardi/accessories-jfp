import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccessoriesModule } from './accessories/accessories.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.development.env',
    isGlobal: true,
  }),AccessoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
