import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities';
import { UserProvider } from 'src/common/providers';
import { HastagController } from 'src/common/controllers';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [HastagController],
  providers: [UserProvider],
  exports: [UserProvider],
})
export class UserModule {}
