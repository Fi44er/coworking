import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { jwtPayload } from '../interfaces/jwt-payload.interface';
import { AdminService } from 'src/services/admin/admin.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger(JwtStrategy.name)
    constructor(
        private readonly configService: ConfigService,
        private readonly adminService: AdminService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET')
        });
    }

    async validate(payload: jwtPayload) { // payload токена(id, login, roles)
        const user = await this.adminService.findOneAdmin(String(payload.id)).catch(err => {
            this.logger.error(err)
            return null
        })
        if (!user) throw new UnauthorizedException()
        return payload;
    }
}