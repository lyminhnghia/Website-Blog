import { Entity, Column } from 'typeorm';
import { BaseEntityBlog } from 'src/entities';
import { Enum } from 'src/shared';

@Entity('user')
export class UserEntity extends BaseEntityBlog {
  @Column('varchar')
  username: string;

  @Column({ type: 'varchar', default: true, select: false })
  password: string;

  @Column({ name: 'first_name', type: 'text' })
  firstName: string;

  @Column({ name: 'last_name', type: 'text' })
  lastName: string;

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
