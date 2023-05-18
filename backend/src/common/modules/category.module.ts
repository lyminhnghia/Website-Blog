import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/entities';
import {
  CategoryAdminProvider,
  CategoryCommonProvider,
} from 'src/common/providers';
import {
  CategoryAdminController,
  CategoryCommonController,
} from 'src/common/controllers';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategoryAdminController, CategoryCommonController],
  providers: [CategoryAdminProvider, CategoryCommonProvider],
  exports: [CategoryAdminProvider, CategoryCommonProvider],
})
export class CategoryModule {}
