import { Body, Controller, Post, Res} from "@nestjs/common";
import { UsersService } from "./users.service";
import * as bcrypt from 'bcrypt'
import { UserDto } from "src/dto/user.dto";


@Controller('/user/auth')
export class LoginController{

    constructor(private readonly userService: UsersService){}

    @Post()
    async login(@Body() userDto:UserDto, @Res() res){
        try{
            const user = await this.userService.findEmailLogin(userDto.email);
        if(!user){
            return res.status(400).jon({message: 'Email salah atau tidak terdaftar'});
        }
        const isPasswordMatches = await bcrypt.compare(userDto.password, user.password);
        if(!isPasswordMatches){
            return res.status(400).jon({message: 'Password salah'});
        }
        res.status(200).json({message: 'user berhasil login'});
        }catch(error){
            console.log(error)
        }
    }   

}