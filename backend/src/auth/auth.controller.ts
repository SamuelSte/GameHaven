import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/tables/users/dto/createUser.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() createUserDto: CreateUserDto) {
    return this.authService.login(createUserDto.username, createUserDto.password);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  status(@Req() req: Request) {
    return req.user;
  }
}