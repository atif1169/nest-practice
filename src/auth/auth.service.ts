import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from 'utils/constants';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/loginUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(registerUserDto: RegisterUserDto) {
    const hash = await bcrypt.hash(registerUserDto.password, SALT_ROUNDS);
    const user = await this.userService.registerUser({
      ...registerUserDto,
      password: hash,
    });

    const accessToken = await this.generateAccessToken(user._id.toString());
    const { fname, lname, email, _id, role } = user;

    return {
      _id,
      fname,
      lname,
      email,
      role,
      accessToken,
    };
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.userService.getUserByEmail(loginUserDto.email);
    const isPasswordValid = await this.comparePassword(
      loginUserDto.password,
      user.password,
    );
    if (!isPasswordValid) throw new UnauthorizedException('Invalid password');

    const accessToken = await this.generateAccessToken(user._id.toString());
    const { _id, fname, lname, email, role } = user;

    return {
      _id,
      fname,
      lname,
      email,
      role,
      accessToken,
    };
  }

  private async generateAccessToken(userId: string) {
    const payload = {
      sub: userId,
    };
    return await this.jwtService.signAsync(payload);
  }

  private async comparePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }
}
