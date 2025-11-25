import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: any) {
    return this.authService.registerUser();
  }

  @Post('login')
  login(@Body() body: any) {
    return this.authService.login();
  }
}
