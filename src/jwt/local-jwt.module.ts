import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { LocalJwtService } from './local-jwt.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'SECRET',
      signOptions: { expiresIn: '3000s' },
    }),
  ],
  exports: [JwtModule, LocalJwtService],
  providers: [JwtStrategy, LocalJwtService]
})
export class LocalJwtModule {}