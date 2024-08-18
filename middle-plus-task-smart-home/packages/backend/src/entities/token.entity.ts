import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tokens')
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  accessToken: string;

  @Column()
  refreshToken: string;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updatedDate: Date;
}
