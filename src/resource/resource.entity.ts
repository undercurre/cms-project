import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('resource')
export class Resource {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  userId: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: false })
  url: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
