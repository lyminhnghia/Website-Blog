import { IsNotEmpty } from 'class-validator';
import { CategoryEntity, BlogEntity } from 'src/entities';
import { BlogDto } from 'src/common/dto';
import { Enum } from 'src/shared';

export class CategoryDto implements Readonly<CategoryDto> {
  id: number;

  @IsNotEmpty()
  title: object;

  description: object;

  status: number;

  blogs: Promise<BlogEntity[]>;

  public static formatRequestForm(dto: Partial<CategoryDto>): CategoryEntity {
    const categoryEntity = new CategoryEntity();

    if (dto.id) categoryEntity.id = dto.id;
    categoryEntity.title = JSON.stringify(dto.title);
    categoryEntity.description = JSON.stringify(dto.description);
    categoryEntity.status = dto.status || Enum.Status.published;

    return categoryEntity;
  }

  public static formatResponseDetails(
    category: Partial<CategoryEntity>,
  ): object {
    if (category.blogs) {
      return {
        ...category,
        title: JSON.parse(category.title),
        description: JSON.parse(category.description),
        blogs: category.blogs.map((item) => ({
          ...item,
          title: JSON.parse(item.title),
          description: JSON.parse(item.description),
          content: JSON.parse(item.content),
          alias: JSON.parse(item.alias),
          hastags: item.hastags.map((hastagItem) => ({
            id: hastagItem.id,
            title: JSON.parse(hastagItem.title),
          })),
        })),
      };
    }
    return {
      ...category,
      title: JSON.parse(category.title),
      description: JSON.parse(category.description),
    };
  }
}
