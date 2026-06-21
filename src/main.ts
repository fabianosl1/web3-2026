import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Web 3 - 2026')
    .setDescription('Modulo para o trabalho de web 3')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer' }, 'jwt')
    .addSecurityRequirements('jwt')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.use('/docs', apiReference({ content: document, layout: 'classic' }));

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
