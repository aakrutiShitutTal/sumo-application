import { Controller } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { Post, Body, Request } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/users/dtos/user.dto';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGaurd } from './local-auth.guard';
@Controller('auth')
export class AuthController {
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
        // return req.user;
    }
}
