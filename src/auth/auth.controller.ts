import { Body, Controller, Get, UseGuards, Request, Post, HttpCode } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { UserDto } from "src/dto/user.dto";

@Controller('/auth')
export class AuthController{

    constructor(private readonly authService:AuthService){}

    @HttpCode(200)
    @Post('/login')
    async signIn(@Body() request: UserDto){
        console.log('this is hit');
        const user = await this.authService.login(request.email, request.password);
        console.log('log dalam auth controller', user);
        return user;
        
    }

    @UseGuards(AuthGuard)
    @Get('/profile')
    getProfile(@Request() req) {
    return req.user;
    
  }

}