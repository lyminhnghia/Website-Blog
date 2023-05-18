import { IsNotEmpty } from 'class-validator';
import { UserEntity } from 'src/entities';

export class ProfileDto implements Readonly<ProfileDto> {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  email: string;

  gender: number;

  birthday: number;

  avatar: string;

  public static formatRequestForm(
    dto: Partial<ProfileDto>,
    entity: UserEntity,
  ): UserEntity {
    entity.firstName = dto.first_name;
    entity.lastName = dto.last_name;
    entity.email = dto?.email || null;
    entity.gender = dto?.gender || null;
    entity.birthday = dto?.birthday || null;

    return entity;
  }

  public static formatResponse(user: Partial<UserEntity>): object {
    return {
      id: user.id,
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      gender: user.gender,
      birthday: user.birthday,
      avatar: user.avatar,
      status: user.status,
      role: user.role,
    };
  }
}
