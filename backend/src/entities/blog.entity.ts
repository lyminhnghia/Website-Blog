import { Entity, Column } from 'typeorm';
import { BaseEntityBlog } from './base.entity';

@Entity('blog')
export class BlogEntity extends BaseEntityBlog {
  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  content: string;

  @Column('varchar')
  alias: string;

  @Column('varchar')
  link_backround: string;

  @Column('tinyint')
  number_view: number;

  @Column('tinyint')
  status: number;
}
