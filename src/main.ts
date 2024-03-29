import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe)
  app.use(cookieParser())
  app.enableCors({origin: '*'})

   // ------------------ swagger --------------------- //
   const config = new DocumentBuilder()
   .setTitle('Coworking API')
   .setDescription('The Coworking API description')
   .setVersion('1.0')
   .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)


  await app.listen(3000);
}
bootstrap();
