/**
 * User Service
 * 
 * Handles all user-related operations including:
 * - User CRUD operations
 * - Profile management
 * - User search and filtering
 * - Role-specific functionality for lawyers and clients
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

/**
 * Interface for filtering users in the findAll method
 */
interface FindAllParams {
  role?: string;
  specialties?: string[];
  maxHourlyRate?: number;
  search?: string;
}

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  /**
   * Creates a new user
   * 
   * @param data - User creation data transfer object
   * @returns Created user object
   */
  async create(data: CreateUserDto) {
    // Hash password if provided
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    // Prepare base user data
    const prismaData: any = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
      phoneNumber: data.phoneNumber,
    };

    // Add lawyer-specific fields only if role is LAWYER and fields are provided
    if (data.role === 'LAWYER') {
      if (data.barNumber) prismaData.barNumber = data.barNumber;
      if (data.specialties?.length) prismaData.specialties = data.specialties;
      if (data.hourlyRate) prismaData.hourlyRate = data.hourlyRate;
      if (data.bio) prismaData.bio = data.bio;
    }

    // Create user in database
    return this.prisma.user.create({
      data: prismaData
    });
  }

  /**
   * Retrieves users with optional filtering
   * 
   * @param params - Search and filter parameters
   * @returns Array of filtered users
   */
  async findAll(params?: FindAllParams) {
    const { role, specialties, maxHourlyRate, search } = params || {};
    
    const where: any = {};
    
    // Add role filter if provided
    if (role) {
      where.role = role;
    }
    
    // Add specialties filter if provided
    if (specialties && specialties.length > 0) {
      where.specialties = {
        hasSome: specialties
      };
    }
    
    // Add hourly rate filter if provided
    if (maxHourlyRate) {
      where.hourlyRate = {
        lte: maxHourlyRate
      };
    }
    
    // Add search filter if provided (searches in name and specialties)
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { specialties: { hasSome: [search] } }
      ];
    }

    // Return filtered users with selected fields
    return this.prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        specialties: true,
        hourlyRate: true,
        bio: true,
        barNumber: true,
        profileImage: true,
      },
    });
  }

  /**
   * Retrieves a single user by ID
   * 
   * @param id - User ID
   * @throws NotFoundException if user doesn't exist
   * @returns User object
   */
  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        role: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        profileImage: true,
        bio: true,
        barNumber: true,
        specialties: true,
        hourlyRate: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  /**
   * Finds a user by email address
   * 
   * @param email - User's email address
   * @returns User object or null if not found
   */
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  /**
   * Finds a user by OAuth provider ID
   * 
   * @param provider - OAuth provider ('google' or 'linkedin')
   * @param oauthId - Provider-specific user ID
   * @returns User object or null if not found
   */
  async findByOAuthId(provider: 'google' | 'linkedin', oauthId: string) {
    return this.prisma.user.findFirst({
      where: {
        OR: [
          { googleId: provider === 'google' ? oauthId : undefined },
          { linkedinId: provider === 'linkedin' ? oauthId : undefined }
        ]
      }
    });
  }

  /**
   * Updates user information
   * 
   * @param id - User ID
   * @param updateUserDto - Data transfer object containing fields to update
   * @throws NotFoundException if user doesn't exist
   * @returns Updated user object
   */
  async update(id: string, updateUserDto: UpdateUserDto) {
    // Check if user exists
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Hash password if it's being updated
    const data = { ...updateUserDto };
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    // Update user in database
    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        role: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        profileImage: true,
        bio: true,
        barNumber: true,
        specialties: true,
        hourlyRate: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  /**
   * Removes a user from the system
   * 
   * @param id - User ID
   * @throws NotFoundException if user doesn't exist
   * @returns Deleted user object
   */
  async remove(id: string) {
    // Check if user exists
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Delete user from database
    return this.prisma.user.delete({
      where: { id },
    });
  }
} 