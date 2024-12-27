import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(
    @Body()
    body: {
      name: string;
      surname: string;
      email: string;
      password: string;
    }
  ) {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = await this.usersService.create({
      name: body.name,
      surname: body.surname,
      email: body.email,
      password: hashedPassword,
      enable: true, // Attiviamo l'utente di default
    });
    return { id: user.id, email: user.email };
  }
}
