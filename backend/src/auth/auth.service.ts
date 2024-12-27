import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/tables/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async login(username: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userService.findOneByUsername(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    
    return {
      access_token: await this.jwtService.signAsync(result)
    };
  }
}