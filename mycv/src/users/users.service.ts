import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  create({ email, password }) {
    const user = this.userRepo.create({ email, password });
    return this.userRepo.save(user);
  }

  findOne(id: number) {
    const user = this.userRepo.findOne({ where: { id } });

    return user;
  }
  find(email: string) {
    const user = this.userRepo.find({ where: { email } });

    return user;
  }
  async update(id: number, attr: Partial<User>) {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) throw new NotFoundException('해당 유저를 찾을 수 없음');

    Object.assign(user, attr);

    return this.userRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) throw new NotFoundException('해당 유저를 찾을 수 없음');

    return this.userRepo.remove(user);
  }
}
