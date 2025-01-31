import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    
    constructor(private userService:UsersService, private jwtService: JwtService){}

    async validateUser(email: string, password: string): Promise<User> {
        const user: User = await this.userService.findEmailLogin(email);
        if (!user) {
          throw new BadRequestException('User not found');
        }
        const isMatch: boolean = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
          throw new BadRequestException('Password does not match');
        }
        return user;
      }
    
      async login(email: string, password:string): Promise<{access_token: string}> {
        const user: User = await this.userService.findEmailLogin(email);
        if (!user) {
          throw new BadRequestException('User not found');
        }
        const isMatch: boolean = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
          throw new BadRequestException('Password does not match');
        }
        const payload = { email: user.email, id: user.id };
        return { access_token: this.jwtService.sign(payload) };
        //sign(payload: Buffer | object, options?: JwtSignOptions): string;
      }
    
    async test(userEmail:string): Promise<string> {
        // let email;
        const user = await this.userService.findEmailLogin(userEmail)
        if(!user){
            throw new UnauthorizedException();
        }
        return user.email;
    }

    
}
