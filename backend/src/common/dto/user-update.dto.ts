import { IsNotEmpty } from 'class-validator';
import { UserEntity } from 'src/entities';
import * as bcrypt from 'bcrypt';
import { Enum } from 'src/shared';

export class UserUpdateDto implements Readonly<UserUpdateDto> {
  id: number;

  password: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  email: string;

  gender: number;

  birthday: number;

  role: number;

  status: number;

  public static formatRequestForm(
    entity: UserEntity,
    dto: Partial<UserUpdateDto>,
  ): UserEntity {
    if (dto.password) entity.password = bcrypt.hashSync(dto.password, 10);
    entity.firstName = dto.firstName;
    entity.lastName = dto.lastName;
    entity.email = dto?.email || null;
    entity.gender = dto?.gender || null;
    entity.birthday = dto?.birthday || null;
    entity.role = dto?.role || Enum.Role.user;
    entity.status = dto?.status || Enum.Status.published;

    return entity;
  }

  public static formatResponse(user: Partial<UserEntity>): object {
    return {
      id: user.id,
      username: user.username,
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      gender: user.gender,
      birthday: user.birthday,
      avatar: user.avatar,
      status: user.status,
      role: user.role,
      created: user.created,
      modified: user.modified,
    };
  }
}
