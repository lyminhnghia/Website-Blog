import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntityBlog, UserEntity, BlogEntity } from 'src/entities';

@Entity('blog_user')
export class BlogUserEntity extends BaseEntityBlog {
  @Column('text')
  state: number;

  @ManyToOne(() => UserEntity, (user) => user.blogUsers)
  user: UserEntity;

  @ManyToOne(() => BlogEntity, (blog) => blog.blogUsers)
  blog: BlogEntity;
}
