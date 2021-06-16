import { Entity, Column } from 'typeorm';
import { BaseEntityBlog } from './base.entity';
import { Enum } from '../const';

@Entity('user')
export class UserEntity extends BaseEntityBlog {
  @Column('varchar')
  username: string;

  @Column({ default: true, select: false })
  password: string;

  @Column('text')
  first_name: string;

  @Column('text')
  last_name: string;

  @Column('varchar')
  email: string;

  @Column('int')
  gender: number;

  @Column({
    type: 'timestamp',
  })
  birthday: number;

  @Column('varchar')
  avatar: string;

  @Column('int')
  status: number;

  @Column({
    type: 'enum',
    enum: Enum.Role,
    default: Enum.Role.user,
  })
  role: Enum.Role;
}
