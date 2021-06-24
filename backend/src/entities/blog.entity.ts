import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntityBlog, CategoryEntity, HastagEntity } from 'src/entities';

@Entity('blogs')
export class BlogEntity extends BaseEntityBlog {
  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  content: string;

  @Column('varchar')
  alias: string;

  @Column({
    name: 'link_background',
    type: 'varchar',
    default: null,
    nullable: true,
  })
  linkBackground: string;

  @Column({
    name: 'number_view',
    type: 'tinyint',
    default: 0,
    nullable: true,
  })
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
