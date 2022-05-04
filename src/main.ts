import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; //Documentando el API
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  //permitiendo Serializacion
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  //Documentando el API
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('CURSO NEST MODULAR')
    .setVersion('1.0')
    //.addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  //Habilitando los cors para deployment
  app.enableCors();

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
