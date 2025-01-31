import { Inject, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoleService {
    constructor(@Inject(PrismaService) private readonly prisma:PrismaService){}

    async getRoles():Promise<Role>{
        const roles = await this.prisma.role.findFirst({
            where: {
              rolename: 'USER',
            },
          })
        return roles;
    }
}
