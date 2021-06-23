import { IsNotEmpty, IsArray } from 'class-validator';
import { BlogEntity } from 'src/entities';
import { Enum } from 'src/shared';

export class BlogDto implements Readonly<BlogDto> {
  id: number;

  @IsNotEmpty()
  title: object;

  description: object;

  content: object;

  link_background: string;

  status: number;

  @IsArray()
  hastags: any;

  @IsArray()
  categories: any;

  public static formatRequestForm(dto: Partial<BlogDto>): BlogEntity {
    const blogEntity = new BlogEntity();

    if (dto.id) blogEntity.id = dto.id;
    blogEntity.title = JSON.stringify(dto.title);
    blogEntity.description = JSON.stringify(dto.description);
    blogEntity.content = JSON.stringify(dto.content);
    blogEntity.linkBackground = dto.link_background;
    blogEntity.status = dto?.status || Enum.Status.draft;
    blogEntity.hastags = dto.hastags;
    blogEntity.categories = dto.categories;

    return blogEntity;
  }

  public static formatResponseDetails(blog: Partial<BlogEntity>): object {
    blog.title = JSON.parse(blog.title);
    blog.description = JSON.parse(blog.description);
    blog.content = JSON.parse(blog.content);
    return blog;
  }
}
