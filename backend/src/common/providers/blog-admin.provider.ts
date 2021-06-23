import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { BlogEntity } from 'src/entities';
import { BlogDto } from 'src/common/dto';
import { MessageConst, pageFormat } from 'src/shared';

@Injectable()
export class BlogProvider {
  constructor(
    @InjectRepository(BlogEntity)
    private blogRepository: Repository<BlogEntity>,
  ) {}
}
