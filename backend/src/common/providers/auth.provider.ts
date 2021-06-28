import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import {} from 'src/entities';
import {} from 'src/common/dto';
import { MessageConst, pageFormat } from 'src/shared';
import stringFormat from 'string-format';

@Injectable()
export class AuthProvider {}
