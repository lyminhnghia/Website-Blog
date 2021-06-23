import { IsNotEmpty } from 'class-validator';
import { CategoryEntity } from 'src/entities';
import { Enum } from 'src/shared';

export class CategoryDto implements Readonly<CategoryDto> {
  @IsNotEmpty()
  title: object;

  description: object;

  status: number;

  public static formatCreateForm(dto: Partial<CategoryDto>): CategoryEntity {
    const categoryEntity = new CategoryEntity();

    categoryEntity.title = JSON.stringify(dto.title);
    categoryEntity.description = JSON.stringify(dto.description);
    categoryEntity.status = Enum.Status.published;

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
