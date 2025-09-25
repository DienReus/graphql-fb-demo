import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { LoggerModule } from 'nestjs-pino';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

import { UserModule } from './infrastructure/modules/user.module';
import { PostModule } from './infrastructure/modules/post.module';
import { User } from './core/entities/user.entity';
import { Post } from './core/entities/post.entity';
import { Like } from './core/entities/like.entity';

@Module({
  imports: [
    // 1. Configuration
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),

    // 2. Logging
    LoggerModule.forRoot({
      pinoHttp: {
        transport: process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty', options: { singleLine: true } }
            : undefined,
      },
    }),

    // 3. Database
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [User, Post, Comment, Like],
        synchronize: true, // DEV only!
      }),
    }),

    // 4. GraphQL
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
    }),

    // 5. Metrics
    PrometheusModule.register({
      path: '/metrics',
    }),

    // 6. Feature Modules
    UserModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}