import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

// TODO: Replace with actual database
const users: any[] = [];

@Injectable()
export class UserService {
  async getMe(userId: string) {
    const user = users.find((u) => u.id === userId);
    if (!user) return null;
    const { password, ...result } = user;
    return result;
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    const user = users.find((u) => u.id === userId);
    if (!user) return null;
    
    Object.assign(user, updateUserDto);
    const { password, ...result } = user;
    return result;
  }
}
