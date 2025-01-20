/**
 * Authentication Service
 * 
 * Handles all authentication-related operations including:
 * - User signup with email/password
 * - User login with email/password
 * - OAuth authentication (Google, LinkedIn)
 * - JWT token generation and validation
 */
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

  /**
   * Handles user signup process
   * 
   * @param signupDto - Data transfer object containing user signup information
   * @throws ConflictException if email already exists
   * @returns Created user object (without password)
   */
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

    // Create user through UserService (which handles password hashing)
    const user = await this.userService.create(createUserDto);

    // Remove password from response for security
    const { password, ...result } = user;
    return result;
  }

  /**
   * Validates user credentials for login
   * 
   * @param email - User's email address
   * @param password - User's password
   * @throws UnauthorizedException if credentials are invalid
   * @returns User object without password
   */
  async validateUser(email: string, password: string) {
    console.log('Attempting to validate user:', email);
    const user = await this.userService.findByEmail(email);
    console.log('User found:', user ? 'yes' : 'no');
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if user has a password (might be OAuth-only account)
    if (!user.password) {
      throw new UnauthorizedException('This account uses social login');
    }

    // Verify password
    console.log('Comparing passwords...');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password valid:', isPasswordValid);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Remove password from response
    const { password: _, ...result } = user;
    return result;
  }

  /**
   * Generates JWT token for authenticated user
   * 
   * @param user - Authenticated user object
   * @returns Object containing access token and user data
   */
  async login(user: any) {
    // Create JWT payload
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };

    // Return token and user data
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }

  /**
   * Validates user from OAuth provider and creates/updates user account
   * 
   * @param profile - OAuth provider profile data
   * @param provider - OAuth provider name ('google' or 'linkedin')
   * @returns User object
   */
  async validateOAuthUser(profile: any, provider: 'google' | 'linkedin') {
    // Try to find user by OAuth ID first
    const user = await this.userService.findByOAuthId(provider, profile.id);
    if (user) {
      return user;
    }

    // If not found by OAuth ID, try to find by email
    const email = profile.emails[0].value;
    const existingUser = await this.userService.findByEmail(email);

    if (existingUser) {
      // Update existing user with OAuth ID
      return this.userService.update(existingUser.id, {
        [`${provider}Id`]: profile.id,
      });
    }

    // Create new user if doesn't exist
    const createUserDto: CreateUserDto = {
      email,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      role: UserRole.CLIENT, // Default to CLIENT role for OAuth users
      [`${provider}Id`]: profile.id,
    };

    return this.userService.create(createUserDto);
  }
} 