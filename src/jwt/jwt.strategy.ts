import { Injectable, NotFoundException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private userService: UsersService) {
        super({
            secretOrKey: 'SECRET',
            ignoreExpiration: false,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload: any){
        //get user instance from here
        const user = this.userService.findById(parseInt(payload.sub))
        if(!user){
            throw new NotFoundException("User not found");
        }
        return user;
    }
}