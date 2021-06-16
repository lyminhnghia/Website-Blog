import { Entity, Column } from 'typeorm';
import { BaseEntityBlog } from './base.entity';

@Entity('category_blog')
export class CategoryBlogEntity extends BaseEntityBlog {}
