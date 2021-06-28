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

  email: string;

  gender: number;

  birthday: number;

  role: number;

  status: number;

  public static formatRequestForm(dto: Partial<UserDto>): UserEntity {
    const userEntity = new UserEntity();

    if (dto.id) userEntity.id = dto.id;
    userEntity.username = dto.username;
    userEntity.password = bcrypt.hash(dto.password, 10);
    userEntity.email = dto?.email || '';
    userEntity.gender = dto?.gender || null;
    userEntity.birthday = dto?.birthday || null;
    userEntity.role = dto?.role || Enum.Role.user;
    userEntity.status = dto?.status || Enum.Status.published;

    return userEntity;
  }
}
