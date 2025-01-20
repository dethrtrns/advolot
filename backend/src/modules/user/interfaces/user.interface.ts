import { UserRole } from '@prisma/client';

export interface IUser {
  id: string;
  email: string;
  password?: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;

  // OAuth fields
  googleId?: string;
  linkedinId?: string;

  // Profile fields
  phoneNumber?: string;
  profileImage?: string;
  bio?: string;

  // Lawyer specific fields
  barNumber?: string;
  specialties?: string[];
  hourlyRate?: number;
}

export interface IUserCreate extends Pick<IUser, 
  'email' | 
  'password' | 
  'role' | 
  'firstName' | 
  'lastName' | 
  'phoneNumber' | 
  'bio'
> {
  specialties?: string[];
  hourlyRate?: number;
  barNumber?: string;
}

export interface IUserUpdate extends Partial<Omit<IUserCreate, 'role'>> {} 