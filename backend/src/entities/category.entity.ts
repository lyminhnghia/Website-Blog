import { Entity, Column, ManyToMany } from 'typeorm';
import { BaseEntityBlog, BlogEntity } from 'src/entities';

@Entity('categories')
export class CategoryEntity extends BaseEntityBlog {
  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('tinyint')
  status: number;

  @ManyToMany((type) => BlogEntity, (blogs) => blogs.categories)
  blogs: Promise<BlogEntity[]>;
}
