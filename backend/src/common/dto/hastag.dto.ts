import { IsNotEmpty } from 'class-validator';
import { HastagEntity, BlogEntity } from 'src/entities';

export class HastagDto implements Readonly<HastagDto> {
  id: number;

  @IsNotEmpty()
  title: object;

  description: object;

  blogs: Promise<BlogEntity[]>;

  public static formatRequestForm(dto: Partial<HastagDto>): HastagEntity {
    const hastagEntity = new HastagEntity();

    if (dto.id) hastagEntity.id = dto.id;
    hastagEntity.title = JSON.stringify(dto.title);
    hastagEntity.description = JSON.stringify(dto.description);

    return hastagEntity;
  }

  public static formatResponseDetails(hastag: Partial<HastagEntity>): object {
    hastag.title = JSON.parse(hastag.title);
    hastag.description = JSON.parse(hastag.description);
    return hastag;
  }
}
