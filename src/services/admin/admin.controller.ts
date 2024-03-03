import { AdminResponse } from './response/admin.response';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './DTO/create.dto';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Post('create')
    async save(@Body() dto: CreateAdminDto) {
        const admin = await this.adminService.save(dto);
        return new AdminResponse(admin);
    }

    @Get(':idOrLogin')
    async findOneAdmin(@Param('idOrLogin') idOrLogin: string) {
        const admin = await this.adminService.findOneAdmin(idOrLogin);
        return new AdminResponse(admin);
    }
}
