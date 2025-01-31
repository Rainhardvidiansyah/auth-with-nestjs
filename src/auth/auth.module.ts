import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { SecretKey } from './secret.token';
import { AuthController } from './auth.controller';


@Module({
  imports: [UsersModule,
    JwtModule.register({
      global: true,
      secret: SecretKey.secret,
      signOptions: { expiresIn: '60s' },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
  
})
export class AuthModule {}
