import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAdminDto } from './DTO/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('Login')
    async Login(dto: LoginAdminDto) {
        const admin = await this.authService.login(dto);
        return admin
    }
}
