import { Entity, Column, ManyToMany } from 'typeorm';
import { BaseEntityBlog, BlogEntity } from 'src/entities';

@Entity('hastags')
export class HastagEntity extends BaseEntityBlog {
  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @ManyToMany((type) => BlogEntity, (blogs) => blogs.hastags)
  blogs: BlogEntity[];
}
