import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  registerUser() {
    return { message: 'User registered', status: 201 };
  }
}
