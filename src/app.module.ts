import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AdminModule } from './services/admin/admin.module';
import { AuthModule } from './services/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './services/auth/guards/jwt-auth.guard';
import { ConfigModule } from '@nestjs/config';
import { RoomModule } from './services/room/room.module';

@Module({
  imports: [PrismaModule, AdminModule, AuthModule, RoomModule, ConfigModule.forRoot({ isGlobal: true })],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }, AppService
  ],
  controllers: [AppController],
})
export class AppModule {}