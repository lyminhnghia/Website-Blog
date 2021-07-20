import { IsNotEmpty } from 'class-validator';
import { UserEntity } from 'src/entities';
import * as bcrypt from 'bcrypt';
import { Enum } from 'src/shared';

export class UserDto implements Readonly<UserDto> {
  id: number;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  email: string;

  gender: number;

  birthday: number;

  role: number;

  status: number;

  public static formatRequestForm(dto: Partial<UserDto>): UserEntity {
    const userEntity = new UserEntity();

    userEntity.username = dto.username;
    userEntity.password = bcrypt.hashSync(dto.password, 10);
    userEntity.firstName = dto.first_name;
    userEntity.lastName = dto.last_name;
    userEntity.email = dto?.email || null;
    userEntity.gender = dto?.gender || null;
    userEntity.birthday = dto?.birthday || null;
    userEntity.role = dto?.role || Enum.Role.user;
    userEntity.status = dto?.status || Enum.Status.published;

    return userEntity;
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
