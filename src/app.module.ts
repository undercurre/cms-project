import {
  Dependencies,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

import { UserModule } from './users/user.module';
import { ImageModule } from './images/image.module';
import { CommentModule } from './comments/comment.module';

import { User } from './users/user.entity';
import { Image } from './images/image.entity';
import { Comment } from './comments/comment.entity';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { AuthMiddleware } from './middleware/auth.middleware';

@Dependencies(DataSource)
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'cms',
      entities: [User, Image, Comment],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    UserModule,
    ImageModule,
    CommentModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR, // 声明为全局拦截器
      useClass: TransformInterceptor, // 使用 ResponseInterceptor
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*'); // 注册中间件
  }
}
