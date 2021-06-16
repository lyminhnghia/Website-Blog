import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntityBlog extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  created: number;

  @Column()
  modified: number;
}
