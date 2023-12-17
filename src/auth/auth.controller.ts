import { BadRequestException, Controller } from '@nestjs/common';
// import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { Post, Body, Request } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/users/dtos/user.dto';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGaurd } from './local-auth.guard';
import { Role } from 'src/enums/role.enum';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    @Post("/consumer/signup")
    @Serialize(UserDto)
    async createConsumer(@Body() userDto: Partial<CreateUserDto>){
        userDto.role = Role.User
        await this.authService.signUp(userDto)
    }

    @Post("/seller/signup")
    @Serialize(UserDto)
    async createSeller(@Body() userDto: Partial<CreateUserDto>){
        userDto.role = Role.Seller
        await this.authService.signUp(userDto)
    }

    @UseGuards(LocalAuthGaurd)
    @Post("/signin")
    async signInUser(@Request() req){
        return await this.authService.login(req.user);
    }
}
