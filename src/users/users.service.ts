import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt'
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class UsersService {

    constructor(
        private readonly prisma: PrismaService,
        private roleService: RoleService
    ) {};

   private async hashPassword (pasword:string):Promise<string>{
        const userPassword = await bcrypt.hash(pasword, 10)
        return userPassword;
    }

    async findEmail(email:string):Promise<boolean>{
        const user = await this.prisma.user.findUnique({
            where: {
              email: email,
            },
        });
        return user !== null;
    }

    async findEmailLogin(email:string):Promise<User>{
        const user = await this.prisma.user.findUnique({
            where: {
              email: email,
            },
            include: {role: true}
        });
        return user;
    }

    async insertRole(): Promise<any> {
        return this.roleService.getRoles();
    }

    async createUser(email:string, password:string): Promise<User> {
        const userPassword = await this.hashPassword(password);
        try {
            const rolesUser = await this.roleService.getRoles();
            const user = await this.prisma.user.create({
                data: {
                  email: email,
                  password: userPassword,
                  username: '',
                  active: false,
                  role:{
                    create: [{ roleId:rolesUser.id }]
                  }
              }});
              console.log('Log dari user service -> data user dalam user service dengan method create:', user)
              return user;
        } catch (error) {
         return error;   
        }
    }

    async getAllUsers():Promise<User[]>{
        const users =  await this.prisma.user.findMany({
            include: { role: true }
        });
         return users;
     }

    getUserId(id:number): Promise<number>{
        return new Promise(function(resolve){
            resolve(id);
        });
    }

    async getUserById(id:number): Promise<User>{
        const user = await this.prisma.user.findUnique({
            where: {
              id: id,
            },
          });
        console.log(typeof user);
        return user;
    }


}
