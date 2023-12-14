import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config';

@Injectable()
export class CommentRepository {
  constructor(private readonly prismaService: PrismaService) {}
}
