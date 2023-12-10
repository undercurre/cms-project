import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Task } from '../tasks/task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phone_number: string;

  // 在插入之前触发，确保为id能通过触发器生成UUID
  @BeforeInsert()
  generateUUID() {
    if (!this.id) {
      this.id = null; // 为null是触发器默认条件，由数据库自己生成uuid
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}

@Entity()
export class UserWithoutSensitiveInfo {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  phone_number: string;
}
