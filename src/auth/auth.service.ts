import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { SignInUserDto } from './dto/signIn_user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInUserDto: SignInUserDto): Promise<any> {
    const user = await this.userService.findOneByUsername(
      signInUserDto.username,
    );
    if (user?.password !== signInUserDto.password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };
    return { access_tokes: await this.jwtService.signAsync(payload) };
  }
}
