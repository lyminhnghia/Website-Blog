import { Entity, Column } from 'typeorm';
import { BaseEntityBlog } from 'src/entities';

@Entity('hastag')
export class HastagEntity extends BaseEntityBlog {
  @Column('text')
  title: string;

  @Column('text')
  description: string;
}
