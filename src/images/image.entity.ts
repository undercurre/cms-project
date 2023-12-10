import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  upload_time: Date;

  @Column()
  user_id: string;

  @Column()
  image_url: string;

  @BeforeInsert()
  setUploadTime() {
    this.upload_time = new Date();
  }
}
