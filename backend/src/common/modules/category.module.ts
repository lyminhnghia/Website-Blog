import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/entities';
import { CategoryProvider } from 'src/common/providers';
import { CategoryAdminController } from 'src/common/controllers';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategoryAdminController],
  providers: [CategoryProvider],
  exports: [CategoryProvider],
})
export class CategoryModule {}
