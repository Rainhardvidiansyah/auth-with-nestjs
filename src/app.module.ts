import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { LoggingMiddleware } from './middlewares/logging.middleware';
import { TokenModule } from './token/token.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { TransactionsModule } from './transactions/transactions.module';


@Module({
  imports: [UsersModule, TokenModule, RoleModule, AuthModule, PrismaModule, ProductsModule, CategoriesModule, TransactionsModule],
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
