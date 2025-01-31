import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TokenModule } from 'src/token/token.module';
import { RoleModule } from 'src/role/role.module';
import { LoginController } from './login.controller';
import { PrismaModule } from 'src/prisma/prisma.module';


@Module({
  imports: [TokenModule, PrismaModule, RoleModule],
  controllers: [UsersController, LoginController],
  providers: [UsersService],
  exports: [
    UsersService
  ]
})
export class UsersModule {}
