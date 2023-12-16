import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService, LocalStrategy],
  imports: [PassportModule, UsersModule, JwtModule.register({
    secret: "SECRET",
    signOptions: {expiresIn: '3000s'}
  })],  
  exports: [AuthService], controllers: [AuthController]
})
export class AuthModule {}
