import { IsNotEmpty, IsArray } from 'class-validator';
import { BlogEntity } from 'src/entities';
import { Enum, removeVietnameseFromString } from 'src/shared';
import { CategoryDto, HastagDto } from 'src/common/dto';

export class BlogDto implements Readonly<BlogDto> {
  id: number;

  @IsNotEmpty()
  title: any;

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
    blogEntity.linkBackground = dto.link_background || '';
    blogEntity.alias = JSON.stringify({
      en: removeVietnameseFromString(dto.title.en),
      vi: removeVietnameseFromString(dto.title.vi),
    });
    blogEntity.status = dto?.status || Enum.Status.draft;
    blogEntity.hastags = dto.hastags;
    blogEntity.categories = dto.categories;

    return blogEntity;
  }

  public static formatResponseDetails(blog: Partial<BlogEntity>): object {
    return {
      ...blog,
      title: JSON.parse(blog.title),
      description: JSON.parse(blog.description),
      content: JSON.parse(blog.content),
      alias: JSON.parse(blog.alias),
      categories: blog.categories.map((item) =>
        CategoryDto.formatResponseDetails(item),
      ),
      hastags: blog.hastags.map((item) =>
        HastagDto.formatResponseDetails(item),
      ),
    };
  }
}
