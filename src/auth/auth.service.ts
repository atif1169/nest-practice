import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  registerUser() {
    return this.userService.registerUser();
  }

  login() {
    return { message: 'User logged in successfully' };
  }
}
