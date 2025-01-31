import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggingMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        console.log('Ini adalah logging yang ada di file logging.middleware.ts');
        next();
    }

}