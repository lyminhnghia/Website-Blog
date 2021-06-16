import { Entity, Column } from 'typeorm';
import { BaseEntityBlog } from './base.entity';

@Entity('category')
export class CategoryEntity extends BaseEntityBlog {
  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('tinyint')
  status: number;
}
