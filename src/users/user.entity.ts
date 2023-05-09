import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  openid: string;

  @Column()
  session_key: string;

  @Column()
  unionid: string;

  @Column()
  access_token: string;

  @Column()
  expires_in: string;

  @Column()
  phone: string;

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
