import { Injectable } from '@nestjs/common';
import { Admin } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AdminService {
    constructor(private readonly prismaService: PrismaService) {}

    // --------------- Create Admin --------------- //
    async save(admin: Partial<Admin>) {
        const hashPassword = this.hashPassword(admin.password)
        return await this.prismaService.admin.create({
            data: {
                login: admin.login,
                password: hashPassword
            }
        })
    }

    // --------------- Find Admin --------------- //
    async findOneAdmin(idOrLogin: string) {
        const admin = await this.prismaService.admin.findFirst({
            where: {
                OR: [
                    {
                        id: idOrLogin
                    },
                    {
                        login: idOrLogin
                    }
                ]
            }
        })

        return admin
    }

    // --------------- Hashing Password --------------- //
    private hashPassword(password: string) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    }
}
