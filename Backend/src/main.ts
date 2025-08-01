import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'; 
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  
  app.useStaticAssets(join(__dirname, '..', 'uploads'));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
