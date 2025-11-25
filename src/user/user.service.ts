import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';

@Injectable()
export class UserService {
  registerUser(registerUserDto: RegisterUserDto) {
    console.log('registerUserDto : ', registerUserDto);
    return { message: 'User registered', status: 201 };
  }
}
