import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Web 3 - 2026')
    .setDescription('Modulo para o trabalho de web 3')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.use('/docs', apiReference({ content: document, layout: 'classic' }));

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
