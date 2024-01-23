import { AnniversariesModule } from './anniversaries/anniversaries.module';
import { UserQuestionRecordModule } from './userquestionrecord/userquestionrecord.module';
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
import { APP_GUARD, APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { AuthMiddleware } from './middleware/auth.middleware';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { TaskModule } from './tasks/task.module';
import { Task } from './tasks/task.entity';
import { GcModule } from './gc/gc.module';
import { StepModule } from './step/step.module';
import { Question } from './question/question.entity';
import { QuestionModule } from './question/question.module';
import { UserQuestionRecord } from './userquestionrecord/userquestionrecord.entity';
import { AnniversariesEntity } from './anniversaries/anniversaries.entity';

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
      entities: [User, Task, Question, UserQuestionRecord, AnniversariesEntity],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    UserModule,
    // ImageModule,
    // CommentModule,
    AuthModule,
    TaskModule,
    GcModule,
    StepModule,
    QuestionModule,
    UserQuestionRecordModule,
    AnniversariesModule,
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
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*'); // 注册中间件
  }
}
