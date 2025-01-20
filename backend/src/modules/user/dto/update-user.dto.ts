import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, MinLength, IsNumber, IsArray } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'john.doe@example.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ example: 'Password123!' })
  @IsString()
  @MinLength(8)
  @IsOptional()
  password?: string;

  @ApiPropertyOptional({ example: 'John' })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiPropertyOptional({ example: 'Doe' })
  @IsString()
  @IsOptional()
  lastName?: string;

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
} 