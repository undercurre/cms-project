/*
 * @Author: undercurre undercurre@163.com
 * @Date: 2023-04-30 17:43:20
 * @LastEditors: undercurre undercurre@163.com
 * @LastEditTime: 2023-06-17 05:25:59
 * @FilePath: \cms-project\src\users\user.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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

  create(username: string, password: string, openid?: string): Promise<User> {
    const user = new User();
    user.username = username;
    user.password = password;
    if (openid) user.openid = openid;
    return this.usersRepository.save(user);
  }

  wechatCreate(openid: string): Promise<User> {
    const user = new User();
    user.username = openid;
    user.password = '827ccb0eea8a706c4c34a16891f84e7b'; //123456
    user.openid = openid;
    if (openid) user.openid = openid;
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
    return await this.usersRepository.findOneBy({
      username: username,
    });
  }

  async findOneByOpenid(openid: string): Promise<User> {
    return await this.usersRepository.findOneBy({
      openid: openid,
    });
  }

  update(id: number, username: string): Promise<UpdateResult> {
    return this.usersRepository.update(id, {
      username: username,
    });
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }
}
