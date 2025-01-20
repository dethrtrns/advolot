import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, IsOptional, MinLength, IsNumber, IsArray } from 'class-validator';
import { UserRole } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: 'Password123!' })
  @IsString()
  @MinLength(8)
  @IsOptional()
  password?: string;

  @ApiProperty({ enum: UserRole })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({ example: 'John' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  lastName: string;

  @ApiPropertyOptional({ example: '+1234567890' })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiPropertyOptional({ example: 'Experienced lawyer with 10 years of practice.' })
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiPropertyOptional({ example: ['Criminal Law', 'Family Law'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  specialties?: string[];

  @ApiPropertyOptional({ example: 150 })
  @IsNumber()
  @IsOptional()
  hourlyRate?: number;

  @ApiPropertyOptional({ example: 'BAR123456' })
  @IsString()
  @IsOptional()
  barNumber?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  googleId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  linkedinId?: string;
} 