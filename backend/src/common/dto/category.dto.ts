import { IsNotEmpty } from 'class-validator';
import { CategoryEntity } from 'src/entities';
import { Enum } from 'src/shared';

export class CategoryDto implements Readonly<CategoryDto> {
  id: number;

  @IsNotEmpty()
  title: object;

  description: object;

  status: number;

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
    category.title = JSON.parse(category.title);
    category.description = JSON.parse(category.description);
    return category;
  }
}
