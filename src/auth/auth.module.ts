import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { LocalJwtModule } from 'src/jwt/local-jwt.module';

@Module({
  providers: [AuthService, LocalStrategy],
  imports: [PassportModule, UsersModule, LocalJwtModule],  
  exports: [AuthService]
})
export class AuthModule {}
