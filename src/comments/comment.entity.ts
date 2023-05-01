import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  comment_time: Date;

  @Column()
  user_id: number;

  @Column()
  image_id: number;

  @BeforeInsert()
  setUploadTime() {
    this.comment_time = new Date();
  }
}
