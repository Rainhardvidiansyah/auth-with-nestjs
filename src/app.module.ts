import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { LoggingMiddleware } from './middlewares/logging.middleware';
import { TokenModule } from './token/token.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [UsersModule, TokenModule, RoleModule, AuthModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(LoggingMiddleware)
    .forRoutes('users');
  }
  
}
