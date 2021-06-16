import { Entity, Column } from 'typeorm';
import { BaseEntityBlog } from './base.entity';

@Entity('blog_hastag')
export class BlogHastagEntity extends BaseEntityBlog {}
