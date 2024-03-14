import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Res, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAdminDto } from './DTO/login.dto';
import { ConfigService } from '@nestjs/config';
import { Cookie } from 'lib/decorators/cookies.decorator';
import { Tokens } from './interfaces/token.interface';
import { Response } from 'express';
import { Public } from 'lib/decorators/public.decorator';
import { ApiTags, ApiBody, ApiResponse, ApiOperation } from '@nestjs/swagger';

const REFRESH_TOKEN = 'refreshtoken';

@Public()
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService   
  ) {}

  @Post('Login')
  @ApiOperation({ summary: 'Login' })
  @ApiBody({ type: LoginAdminDto })
  @ApiResponse({ status: 201, description: 'Login successful' })
  async Login(@Body() dto: LoginAdminDto, @Res() res: Response): Promise<Response> {
    const tokens = await this.authService.login(dto);
    if (!tokens) throw new BadRequestException('Unable to log in with the provided data');
    return this.setRefreshTokenToCookie(tokens, res);
  }

  @Get('logout')
  @ApiOperation({ summary: 'Logout' })
  async logout(@Cookie(REFRESH_TOKEN) refreshToken: string, @Res() res: Response): Promise<Response> {
    if (!refreshToken) return res.sendStatus(HttpStatus.OK);
    await this.authService.deleteRefreshToken(refreshToken);
    res.cookie(REFRESH_TOKEN, '', { httpOnly: true, secure: true, expires: new Date() });
    return res.sendStatus(HttpStatus.OK);
  }

  @Get('refresh-tokens')
  @ApiOperation({ summary: 'Refresh tokens' })
  @ApiResponse({ status: 201, description: 'Tokens refreshed' })
  async refreshToken(@Cookie(REFRESH_TOKEN) refreshToken: string, @Res() res: Response): Promise<Response> {
    if (!refreshToken || typeof refreshToken !== 'string') throw new UnauthorizedException();
    const tokens = await this.authService.refreshTokens(refreshToken);
    if (!tokens) throw new UnauthorizedException();
    return this.setRefreshTokenToCookie(tokens, res);
  }

  private setRefreshTokenToCookie(tokens: Tokens, res: Response): Response {
    if (!tokens) throw new UnauthorizedException();
    res.cookie(REFRESH_TOKEN, tokens.refreshToken.token, {
      httpOnly: true,
      sameSite: 'lax',
      expires: new Date(tokens.refreshToken.exp),
      secure: this.configService.get('NODE_ENV', 'development') === 'production',
      path: '/'
    });
    return res.status(HttpStatus.CREATED).json({ accessToken: tokens.accessToken });
  }
}