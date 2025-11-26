import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

// TODO: Replace with actual database
const users: any[] = [];

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    
    const user = {
      id: Date.now().toString(),
      name: registerDto.name,
      email: registerDto.email,
      password: hashedPassword,
      plan: 'free',
      projects: [],
    };

    users.push(user);

    const { password, ...result } = user;
    return {
      user: result,
      accessToken: this.generateAccessToken(user),
      refreshToken: this.generateRefreshToken(user),
    };
  }

  async login(loginDto: LoginDto) {
    const user = users.find((u) => u.email === loginDto.email);
    
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password, ...result } = user;
    return {
      user: result,
      accessToken: this.generateAccessToken(user),
      refreshToken: this.generateRefreshToken(user),
    };
  }

  async getMe(userId: string) {
    const user = users.find((u) => u.id === userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    return result;
  }

  private generateAccessToken(user: any) {
    return this.jwtService.sign(
      { sub: user.id, email: user.email },
      { expiresIn: '15m' },
    );
  }

  private generateRefreshToken(user: any) {
    return this.jwtService.sign(
      { sub: user.id, email: user.email },
      { expiresIn: '7d' },
    );
  }
}
