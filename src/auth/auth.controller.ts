import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.registerUser(registerUserDto);
  }

  @Post('login')
  login(@Body() body: any) {
    return this.authService.login();
  }
}
