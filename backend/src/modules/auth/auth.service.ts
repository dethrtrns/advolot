import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    // Check if user already exists
    const existingUser = await this.userService.findByEmail(signupDto.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Map SignupDto to CreateUserDto
    const createUserDto: CreateUserDto = {
      email: signupDto.email,
      password: signupDto.password,
      firstName: signupDto.firstName,
      lastName: signupDto.lastName,
      role: signupDto.role,
      phoneNumber: signupDto.phoneNumber,
      // Add lawyer-specific fields only if role is LAWYER
      ...(signupDto.role === 'LAWYER' && {
        barNumber: signupDto.barNumber,
        specialties: signupDto.specialties,
        hourlyRate: signupDto.hourlyRate,
        bio: signupDto.bio,
      }),
    };

    // Create user
    const user = await this.userService.create(createUserDto);

    // Remove password from response
    const { password, ...result } = user;
    return result;
  }

  async validateUser(email: string, password: string) {
    console.log('Attempting to validate user:', email);
    const user = await this.userService.findByEmail(email);
    console.log('User found:', user ? 'yes' : 'no');
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.password) {
      throw new UnauthorizedException('This account uses social login');
    }

    console.log('Comparing passwords...');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password valid:', isPasswordValid);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password: _, ...result } = user;
    return result;
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