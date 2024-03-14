import { AdminResponse } from './response/admin.response';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './DTO/create.dto';
import { ApiTags, ApiBody, ApiParam, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Public } from 'lib/decorators/public.decorator';

@Public()
@Controller('admin')
@ApiTags('Admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create admin' })
  @ApiBody({ type: CreateAdminDto })
  @ApiResponse({ status: 201, description: 'Admin created', type: AdminResponse })
  async save(@Body() dto: CreateAdminDto) {
    const admin = await this.adminService.save(dto);
    return new AdminResponse(admin);
  }

  @Get(':idOrLogin')
  @ApiOperation({ summary: 'Find admin by ID or login' })
  @ApiParam({ name: 'idOrLogin', description: 'Admin ID or login' })
  @ApiResponse({ status: 200, description: 'Admin found', type: AdminResponse })
  async findOneAdmin(@Param('idOrLogin') idOrLogin: string) {
    const admin = await this.adminService.findOneAdmin(idOrLogin);
    return new AdminResponse(admin);
  }
}