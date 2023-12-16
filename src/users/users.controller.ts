import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { LocalAuthGaurd } from 'src/auth/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller("auth")
export class UsersController {
    constructor(private usersService: UsersService, private authService: AuthService){}
    @Post("/signup")
    @Serialize(UserDto)
    createUser(@Body() body: CreateUserDto){
        this.authService.signUp(body.email, body.password)
    }
    @UseGuards(LocalAuthGaurd)
    @Post("/signin")
    signInUser(@Request() req){
        return this.authService.login(req.user);
    }
}