import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UsePipes } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsUUIDParam } from 'src/common/decorators/is-uuidparam';

@Controller('user')
export class UserController {
  constructor(private readonly UsersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.UsersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.UsersService.findAll();
  }

  @Get(':id')
  findOne(@IsUUIDParam('id') id: string) {
    return this.UsersService.findOne(id);
  }

  @Patch(':id')
  update(@IsUUIDParam('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.UsersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.UsersService.remove(id);
  }
}
