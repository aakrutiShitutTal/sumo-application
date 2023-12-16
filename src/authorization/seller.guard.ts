import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

export class SellerGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        const user = req.user;
        if (!user){
            return false
        }
        if (user.role === 0){
            return true;
        }
    }
}