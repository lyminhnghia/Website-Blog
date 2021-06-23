import { Entity, Column } from 'typeorm';
import { BaseEntityBlog } from 'src/entities';
import { Enum } from 'src/shared';

@Entity('user')
export class UserEntity extends BaseEntityBlog {
  @Column('varchar')
  username: string;

  @Column({ type: 'varchar', default: true, select: false })
  password: string;

  @Column('text')
  first_name: string;

  @Column('text')
  last_name: string;

  @Column('varchar')
  email: string;

  @Column('tinyint')
  gender: number;

  @Column('int')
  birthday: number;

  @Column('varchar')
  avatar: string;

  @Column('tinyint')
  status: number;

  @Column({
    type: 'enum',
    enum: Enum.Role,
    default: Enum.Role.user,
  })
  role: Enum.Role;
}
