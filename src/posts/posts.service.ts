import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { DeepPartial, Repository } from 'typeorm';
import { Posts } from './entities/posts.entity';
import { NullableType } from '../utils/types/nullable.type';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private postsRepository: Repository<Posts>,
  ) {}

  create(createPostDto: CreatePostDto, userId: number): Promise<Posts> {
    return this.postsRepository.save(
      this.postsRepository.create({ ...createPostDto, userId }),
    );
  }

  findManyWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<Posts[]> {
    return this.postsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(fields: EntityCondition<Posts>): Promise<NullableType<Posts>> {
    return this.postsRepository.findOne({
      where: fields,
    });
  }

  update(id: Posts['id'], payload: DeepPartial<Posts>): Promise<Posts> {
    return this.postsRepository.save(
      this.postsRepository.create({
        id,
        ...payload,
      }),
    );
  }

  async softDelete(id: Posts['id']): Promise<void> {
    await this.postsRepository.softDelete(id);
  }
}
