import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.password) {
      throw new UnauthorizedException('This account uses social login');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }

  async validateOAuthUser(profile: any, provider: 'google' | 'linkedin') {
    const email = profile.emails[0].value;
    
    // First try to find user by OAuth ID
    const userByOAuthId = await this.userService.findByOAuthId(provider, profile.id);
    if (userByOAuthId) {
      return userByOAuthId;
    }

    // Then try to find user by email
    const userByEmail = await this.userService.findByEmail(email);
    if (userByEmail) {
      // Update existing user with OAuth ID if they don't have one
      if (!userByEmail[`${provider}Id`]) {
        return this.userService.update(userByEmail.id, {
          [`${provider}Id`]: profile.id
        });
      }
      return userByEmail;
    }

    // Create new user if neither exists
    const createUserDto: CreateUserDto = {
      email,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      role: UserRole.CLIENT,
      [`${provider}Id`]: profile.id,
    };

    return this.userService.create(createUserDto);
  }
} 