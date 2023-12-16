import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';

const scrypt = promisify(_scrypt)
@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService){}

  async validateUser(email: string, password: string): Promise<any>{
    const user = await this.userService.findByEmail(email);
    if (!user){
      throw new NotFoundException("User not found")
    }
    const [salt, storedHash] = user.password.split(".")
    const hash = await (scrypt(password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')){
      throw new BadRequestException("Password incorrect")
    }
    return user;

  }

  async login(user: any){
    const payload = {
        email: user.email, sub: user.id
    }
    return {access_token: this.jwtService.sign(payload)}
  }

  async signUp(email: string, password: string){
    //Check is the user with this email already exists
    const alreadyExisitingUser = await this.userService.findByEmail(email)
    if(alreadyExisitingUser){
      throw new BadRequestException("Email in use")
    }
    //Hash the user password
    //Generate salt
    const salt = randomBytes(8).toString('hex')

    //Has the salt and password together
    const hash = await (scrypt(password, salt, 32)) as Buffer ;

    //Join the hashed result and salt together
    const result = salt + "." + hash.toString('hex')

    //Create new user and save it 
    return this.userService.create(email, result)
  }
}
