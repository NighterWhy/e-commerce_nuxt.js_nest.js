import { Controller, Put, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.usersService.userUpdate(id, body);
  }
}
