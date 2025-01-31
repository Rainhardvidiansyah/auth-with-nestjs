import { Body, Controller, Post } from "@nestjs/common";
import { TokenModel } from "src/model/token.model";

@Controller('token')
export class TokenController{

    @Post()
    createToken(@Body() request: TokenModel): TokenModel{
        return request;
    }
}