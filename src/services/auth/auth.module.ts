import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AdminModule } from '../admin/admin.module';
import { STRATEGIES } from './strategies';
import { GUARDS } from './guards';
import { options } from './config';
import { AdminService } from '../admin/admin.service';

@Module({
  imports: [PassportModule, JwtModule.registerAsync(options()), AdminModule],
  controllers: [AuthController],
  providers: [AuthService, AdminService, ...STRATEGIES, ...GUARDS],
})
export class AuthModule {}
