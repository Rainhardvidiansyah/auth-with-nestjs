import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Query, Res} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from 'src/dto/user.dto';
import { TokenService } from 'src/token/token.service';


@Controller('users')
export class UsersController {
    constructor(private userService: UsersService, private tokenService: TokenService){}

    async getuserId(@Param('id') id:number, @Res() res){
        const userId = await this.userService.getUserId(id);
        if(userId == 1) {res.status(200).json(userId);}
        else {res.status(404).json('user not found');}
    }

    //query params
    @Get()
    getUserRole(@Query('role') role?: 'admin' | 'user'){
        const roles = [];
        roles.push(role);
        if(roles.includes('admin')){
            console.log("mantap")
        }else{
            console.log('tidak mantap')
        }
        console.log(roles);
        return roles;
    }

    @Post('registration')
    async createUser(@Body() request:UserDto, @Res() res){
        try{
        const isEmailSame = await this.userService.findEmail(request.email);
        if(isEmailSame){
            throw new HttpException('Email has already been registered', HttpStatus.BAD_REQUEST);
        }
        const user = await this.userService.createUser(request.email, request.password);
        console.log(user);
        res.status(201).json({message: "User just registered!"})
        }catch(error){
            res.send(error);
        }
    }


    @Get('/all')
    async getAllUser(@Res() res){
        const users = await this.userService.getAllUsers();
        for(let i =  0; i < users.length; i++){
            console.log(users[i]);
        }
        res.status(200).json({data: users});
    }

    @Get('/id-number/:id')
    getIdNumber(@Param('id', ParseIntPipe) id:number): number{
        return id;
    }

    @Get('/:id')
    async getUserById(@Param('id', ParseIntPipe) id:number, @Res() res){
        const user = await this.userService.getUserById(id)
        console.log('tipe data user dalam user.controller: ', typeof user);
        if(!user) return res.status(404).json({message: "user tidak ditemukan"});
        res.send(user);
    }

    @Post('again')
    createUserDto(@Body() dto: UserDto, @Res() res){
        if(dto.password.length < 8){
           return res.status(500).send('password tidak utuh')
        }
        res.send(`user dengan mail ${dto.email} telah terdaftar`);
    }
    

}


