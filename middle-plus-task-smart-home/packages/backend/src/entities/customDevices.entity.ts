import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class CustomDevice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column('jsonb')
  params: Record<string, string | boolean | number>;
}
