import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiQuery } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request as ExpressRequest } from 'express';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiQuery({ name: 'role', required: false })
  @ApiQuery({ name: 'specialties', required: false })
  @ApiQuery({ name: 'maxHourlyRate', required: false })
  @ApiQuery({ name: 'search', required: false })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll(
    @Query('role') role?: string,
    @Query('specialties') specialties?: string,
    @Query('maxHourlyRate') maxHourlyRate?: number,
    @Query('search') search?: string,
  ) {
    return this.userService.findAll({
      role,
      specialties: specialties?.split(','),
      maxHourlyRate: maxHourlyRate ? Number(maxHourlyRate) : undefined,
      search,
    });
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getCurrentUser(@Request() req: ExpressRequest & { user: { id: string } }) {
    return this.userService.findOne(req.user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
} 