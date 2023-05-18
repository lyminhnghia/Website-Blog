import { Entity, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import {
  BaseEntityBlog,
  CategoryEntity,
  HastagEntity,
  BlogUserEntity,
} from 'src/entities';

@Entity('blogs')
export class BlogEntity extends BaseEntityBlog {
  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  content: string;

  @Column('text')
  alias: string;

  @Column({
    name: 'link_background',
    type: 'varchar',
    default: null,
    nullable: true,
  })
  linkBackground: string;

  @Column({
    name: 'number_view',
    type: 'tinyint',
    default: 0,
    nullable: true,
  })
  numberView: number;

  @Column('tinyint')
  status: number;

  @ManyToMany((type) => CategoryEntity, (categories) => categories.blogs)
  @JoinTable({ name: 'category_blog' })
  categories: CategoryEntity[];

  @ManyToMany((type) => HastagEntity, (hastags) => hastags.blogs)
  @JoinTable({ name: 'blog_hastag' })
  hastags: HastagEntity[];

  @OneToMany(() => BlogUserEntity, (blog_user) => blog_user.blog)
  blogUsers: BlogUserEntity[];
}
