import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntityBlog, BlogEntity, HastagEntity } from 'src/entities';

@Entity('blog_hastag')
export class BlogHastagEntity extends BaseEntityBlog {
  @ManyToOne((type) => BlogEntity)
  @JoinColumn({ name: 'blog_id' })
  blog: BlogEntity;

  @ManyToOne((type) => HastagEntity)
  @JoinColumn({ name: 'hastag_id' })
  hastag: HastagEntity;
}
