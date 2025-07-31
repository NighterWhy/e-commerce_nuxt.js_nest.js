import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/user/schemas/user.schema'; 

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
        
    ) { }

    @Post('login')
    async login(@Body()
    body: {
        email: string;
        password: string

    }) {
        return this.authService.login(body.email, body.password)
    }

    @Post('register')
    async register(
        @Body()
        body: {
            email: string;
            name: string;
            password: string;
        }
    ) {
        return this.authService.register(body.email, body.password, body.name)
    }


    @Get('allusers')
    async allUsers(): Promise <{users: User[]}> {
        return await this.authService.getAllUsers();
        
    }
}
