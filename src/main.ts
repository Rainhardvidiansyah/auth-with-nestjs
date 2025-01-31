import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { instance } from './common/winston.logger';
import * as dotenv from 'dotenv';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(
      {
        instance: instance

      }
    )
  });
  
  dotenv.config();
  const port = process.env.port;
  console.log(`my port is ${port}`);
  console.log()
  await app.listen(3000);
}

bootstrap();
