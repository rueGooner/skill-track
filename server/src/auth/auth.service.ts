import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { config } from 'process';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private jwtService: JwtService, private configService: ConfigService) {}

  async login(loginPayload: LoginDto) {
    const existingUser = await this.validateUserCredentials(loginPayload);
    if (!existingUser) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: existingUser.id, email: existingUser.email, role: existingUser.role };

    const access_token = await this.jwtService.signAsync(payload, 
      {
        secret: this.configService.get<string>('JWT_SECRET'),
      }
    );

    return { access_token };
  }

  async register(registerPayload: RegisterDto) { 
    const existingUser = await this.validateUserCredentials(registerPayload);

    if (existingUser) throw new ConflictException('Email is already registered.');
    const hashedPassword = await bcrypt.hash(registerPayload.password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        ...registerPayload,
        password: hashedPassword,
      }
    })
    
    const payload = { sub: newUser.id, email: newUser.email, role: newUser.role };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }


  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: LoginDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async validateUserCredentials({email, password }: LoginDto | RegisterDto): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return null;

    return user;
  }
}
