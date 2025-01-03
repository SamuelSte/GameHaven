import { Body, Controller, Get, HttpCode, Options, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/tables/users/dto/createUser.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const token = await this.authService.login(createUserDto.username, createUserDto.password);

    response.cookie('jwt', token, {
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
      path: '/'
    })

    return {message: 'Login succesful'};
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  status(@Req() req: Request) {
    return req.user;
  }
}