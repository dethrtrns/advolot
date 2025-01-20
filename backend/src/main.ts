import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: [process.env.FRONTEND_URL || 'http://localhost:3000', 'http://localhost:3002'],
    credentials: true,
  });

  // Enable session middleware
  app.use(
    session({
      secret: process.env.JWT_SECRET || 'your-secret-key-change-this-in-production',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000 * 60 * 24, // 24 hours
        secure: process.env.NODE_ENV === 'production',
      },
    }),
  );

  // Enable validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Setup Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Advolot API')
    .setDescription('The Advolot legal consultation platform API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Start the server
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap(); 