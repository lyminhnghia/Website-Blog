import {
  Body,
  Controller,
  Post,
  Put,
  Get,
  Delete,
  Query,
  Param,
} from '@nestjs/common';
import { BlogProvider } from 'src/common/providers';

@Controller('admin')
export class BlogController {
  constructor(private readonly blogProvider: BlogProvider) {}
}
