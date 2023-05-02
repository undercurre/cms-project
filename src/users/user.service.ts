import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(username: string, password: string): Promise<User> {
    const user = new User();
    user.username = username;
    user.password = password;
    console.log(user);
    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.usersRepository.findOneBy({
      id: id,
    });
  }

  async findOneByName(username: string): Promise<User> {
    console.log(username);
    return await this.usersRepository.findOneBy({
      username: username,
    });
  }

  update(id: number, username: string): Promise<UpdateResult> {
    console.log(id, username);
    return this.usersRepository.update(id, {
      username: username,
    });
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }
}
