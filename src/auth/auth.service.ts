import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async registerUser(registerUserDto: RegisterUserDto) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(registerUserDto.password, saltRounds);
    return this.userService.registerUser({...registerUserDto, password:hash});
  }

  login() {
    return { message: 'User logged in successfully' };
  }
}
