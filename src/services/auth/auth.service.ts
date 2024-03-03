import { PrismaService } from './../../prisma/prisma.service';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { LoginAdminDto } from './DTO/login.dto';
import { AdminService } from '../admin/admin.service';
import { compareSync } from 'bcrypt';
import { v4 } from 'uuid';
import { add } from 'date-fns';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name)
    constructor(
        private readonly prismaService: PrismaService,
        private readonly adminService: AdminService
    ) {}

    async login(dto: LoginAdminDto) {
        const admin = await this.adminService.findOneAdmin(dto.login).catch(err => {
            this.logger.error(err)
            return null
        });

        if(!admin || !compareSync(dto.password, admin.password)) throw new UnauthorizedException('Не верный логин или пароль')
    }

    // Если refresh токен есть в бд, удаляет его и генерирует новую пару accsess и refresh
    async refreshTokens(refreshToken: string, agent: string): Promise<Tokens> {
        const token = await this.prismaService.token.delete({ where: { token: refreshToken } })
        if (!token || new Date(token.exp) < new Date()) throw new UnauthorizedException()

        const user = await this.adminService.findOneAdmin(String(token.adminId))
        return this.generateTokens(user, agent)
    }

    // Генерация пары accsess и refresh токенов
    private async generateTokens(user: User, agent: string): Promise<Tokens> {
        const accessToken = 'Bearer ' + this.jwtService.sign({
            id: user.id,
            login: user.login,
            roles: user.roles
        })
        const refreshToken = await this.getRefreshToken(user.id, agent)
        return { accessToken, refreshToken }
    }

    // Генерация refresh токена
    private async getRefreshToken(adminId: string, agent: string): Promise<Token> {
        const _token = await this.prismaService.token.findFirst({ where: { adminId: adminId } })
        const token = _token?.token ?? ''
        return this.prismaService.token.upsert({
            where: { token },
            update: {
                token: v4(),
                exp: add(new Date(), { months: 1 }),
            },
            create: {
               token : v4(),
                exp: add(new Date(), { months: 1 }),
                adminId
            }
        })
    }

    // Удаление refresh токена

    deleteRefreshToken(token: string) {
        return this.prismaService.token.delete({ where: { token } })
    }
}
