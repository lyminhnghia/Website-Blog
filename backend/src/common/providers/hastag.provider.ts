import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { HastagEntity } from 'src/entities';
import { HastagDto } from 'src/common/dto';
import { MessageConst, pageFormat } from 'src/shared';

@Injectable()
export class HastagProvider {}
