import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/entities';
import { HastagProvider } from 'src/common/providers';
import { HastagController } from 'src/common/controllers';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [HastagController],
  providers: [HastagProvider],
  exports: [HastagProvider],
})
export class HastagModule {}
