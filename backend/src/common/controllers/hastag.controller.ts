import { Body, Controller, Post, Put, Delete, Param } from '@nestjs/common';
import { HastagDto } from 'src/common/dto';
import { HastagProvider } from 'src/common/providers';
import { response } from 'src/shared';

@Controller('admin')
export class HastagController {}
