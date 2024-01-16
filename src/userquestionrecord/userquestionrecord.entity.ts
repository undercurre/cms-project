// src/userquestionrecord/userquestionrecord.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Question } from '../question/question.entity';

@Entity({ name: 'userquestionrecord' })
export class UserQuestionRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  questionId: string;

  @Column({ nullable: true })
  userAnswer: string;

  @Column()
  isCorrect: boolean;

  @Column({ nullable: true })
  score: number;

  @Column({ type: 'timestamp', nullable: true })
  startTime: Date;

  @Column({ type: 'timestamp', nullable: true })
  endTime: Date;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
