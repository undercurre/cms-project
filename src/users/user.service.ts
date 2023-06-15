/*
 * @Author: undercurre undercurre@163.com
 * @Date: 2023-04-30 17:43:20
 * @LastEditors: undercurre undercurre@163.com
 * @LastEditTime: 2023-06-16 01:13:20
 * @FilePath: \cms-project\src\users\user.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly httpService: HttpService,
  ) {}

  create(username: string, password: string): Promise<User> {
    const user = new User();
    user.username = username;
    user.password = password;
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

  update(id: number, username: string): Promise<UpdateResult> {
    return this.usersRepository.update(id, {
      username: username,
    });
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }

  async wechatAuth(code: string): Promise<User> {
    const user = new User();
    const APPID = 'wx7283eac281febaaf';
    const SECRET = '82d4a64f10cf7f9bb04d769d696011c0';
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${code}&grant_type=authorization_code`;
    const response = await this.httpService.get(url).toPromise();
    const data = response.data;
    console.log(data);
    this.httpService.get(url);
    user.username = data.openid;
    user.password = '827ccb0eea8a706c4c34a16891f84e7b';
    user.openid = data.openid;
    return this.usersRepository.save(user);
  }
}
