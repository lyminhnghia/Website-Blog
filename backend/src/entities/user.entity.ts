import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntityBlog, BlogUserEntity } from 'src/entities';
import { Enum } from 'src/shared';

@Entity('user')
export class UserEntity extends BaseEntityBlog {
  @Column('varchar')
  username: string;

  @Column({ type: 'varchar', default: true })
  password: string;

  @Column({ name: 'first_name', type: 'text' })
  firstName: string;

  @Column({ name: 'last_name', type: 'text' })
  lastName: string;

  @Column({
    type: 'varchar',
    default: null,
    nullable: true,
  })
  email: string;

  @Column({
    type: 'tinyint',
    default: null,
    nullable: true,
  })
  gender: number;

  @Column({
    type: 'int',
    default: null,
    nullable: true,
  })
  birthday: number;

  @Column({
    type: 'varchar',
    default: null,
    nullable: true,
  })
  avatar: string;

  @Column('tinyint')
  status: number;

  @Column({
    type: 'enum',
    enum: Enum.Role,
    default: Enum.Role.user,
  })
  role: Enum.Role;

  @OneToMany(() => BlogUserEntity, (blog_user) => blog_user.user)
  blogUsers: BlogUserEntity[];
}
