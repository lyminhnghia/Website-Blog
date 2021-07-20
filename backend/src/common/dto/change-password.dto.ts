import { IsNotEmpty } from 'class-validator';
import { UserEntity } from 'src/entities';
import * as bcrypt from 'bcrypt';

export class ChangePasswordDto implements Readonly<ChangePasswordDto> {
  @IsNotEmpty()
  old_password: string;

  @IsNotEmpty()
  new_password: string;

  @IsNotEmpty()
  confirm_password: string;

  public static formatRequestForm(
    dto: Partial<ChangePasswordDto>,
    entity: UserEntity,
  ): UserEntity {
    entity.password = bcrypt.hashSync(dto.new_password, 10);

    return entity;
  }
}
