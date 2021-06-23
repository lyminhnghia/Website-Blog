import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntityBlog, CategoryEntity, HastagEntity } from 'src/entities';

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

  @Column({ name: 'link_background', type: 'varchar' })
  linkBackground: string;

  @Column({ name: 'number_view', type: 'tinyint' })
  numberView: number;

  @Column('tinyint')
  status: number;

  @ManyToMany((type) => CategoryEntity, (categories) => categories.blogs)
  @JoinTable({ name: 'category_blog' })
  categories: CategoryEntity[];

  @ManyToMany((type) => HastagEntity, (hastags) => hastags.blogs)
  @JoinTable({ name: 'blog_hastag' })
  hastags: HastagEntity[];
}
