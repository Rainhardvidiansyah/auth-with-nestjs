import { Injectable } from '@nestjs/common';
import { BlaclistToken } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class TokenService {

    constructor(private readonly prisma: PrismaService){}
    //tokens, userid
    async createToken(token:string, userid:number):Promise<BlaclistToken>{
        const generateToken = this.prisma.blaclistToken.create({
            data:{
               token: token,
               userId:userid 
            }
        });
        return generateToken;
    }
}
