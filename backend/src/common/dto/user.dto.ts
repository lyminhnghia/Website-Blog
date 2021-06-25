import { IsNotEmpty } from 'class-validator';
import { UserEntity } from 'src/entities';

export class UserDto implements Readonly<UserDto> {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  email: string;

  gender: number;

  birthday: number;

  role: number;
}
