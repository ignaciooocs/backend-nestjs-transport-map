import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FirebaseAuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Get('test/auth')
  @UseGuards(FirebaseAuthGuard)
  test(@Req() req) {
    try {
      console.log("Funciona correctamente");
      return { message: "Funciona correctamente", user: req.user };
      
    } catch (error) {
      console.log(error);
      return { message: error };
    }
  }
}
