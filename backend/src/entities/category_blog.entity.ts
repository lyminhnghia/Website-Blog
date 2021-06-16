import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntityBlog, BlogEntity, CategoryEntity } from '../entities';

@Entity('category_blog')
export class CategoryBlogEntity extends BaseEntityBlog {
  @ManyToOne((type) => BlogEntity)
  @JoinColumn({ name: 'blog_id' })
  blog: BlogEntity;

  @ManyToOne((type) => CategoryEntity)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;
}
