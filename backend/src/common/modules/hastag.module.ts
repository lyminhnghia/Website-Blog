import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HastagEntity } from 'src/entities';
import { HastagProvider } from 'src/common/providers';
import { HastagController } from 'src/common/controllers';

@Module({
  imports: [TypeOrmModule.forFeature([HastagEntity])],
  controllers: [HastagController],
  providers: [HastagProvider],
  exports: [HastagProvider],
})
export class HastagModule {}
