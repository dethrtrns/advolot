import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

interface FindAllParams {
  role?: string;
  specialties?: string[];
  maxHourlyRate?: number;
  search?: string;
}

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    // Base user data
    const prismaData: any = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
      phoneNumber: data.phoneNumber,
    };

    // Add lawyer-specific fields only if role is LAWYER and fields have values
    if (data.role === 'LAWYER') {
      if (data.barNumber) prismaData.barNumber = data.barNumber;
      if (data.specialties?.length) prismaData.specialties = data.specialties;
      if (data.hourlyRate) prismaData.hourlyRate = data.hourlyRate;
      if (data.bio) prismaData.bio = data.bio;
    }

    return this.prisma.user.create({
      data: prismaData
    });
  }

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
    
    // Add search filter if provided
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { specialties: { hasSome: [search] } }
      ];
    }

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

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

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

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const data = { ...updateUserDto };
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

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

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.prisma.user.delete({
      where: { id },
    });
  }
} 