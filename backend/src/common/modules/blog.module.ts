import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogEntity } from 'src/entities';
import { BlogProvider } from 'src/common/providers';
import { BlogController } from 'src/common/controllers';

@Module({
  imports: [TypeOrmModule.forFeature([BlogEntity])],
  controllers: [BlogController],
  providers: [BlogProvider],
  exports: [BlogProvider],
})
export class BlogModule {}
