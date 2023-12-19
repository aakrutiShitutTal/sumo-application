import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { Role } from "src/enums/role.enum";

export class RoleGuard implements CanActivate {
    constructor(private roles: Role[]){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        const user = req.user;
        if (!user){
            return false
        }
        if (this.roles.includes(user.role)){
            return true;
        }
    }
}