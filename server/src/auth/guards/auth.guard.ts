import { CanActivate, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService
  ) {}
  
  async canActivate(context: any): Promise<boolean> {
    const secret = this.config.get<string>('JWT_SECRET');

    try {
      const request = context.switchToHttp().getRequest();
      const { authorization } = request.headers;
      if (!authorization) throw new UnauthorizedException('No token provided');

      const validToken = await this.jwtService.verifyAsync(authorization.split(' ')[1], { secret})
      request.user = validToken;
      return true;
    } catch {
      return false;
    }
  }
}
