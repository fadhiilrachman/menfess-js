import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, Validate } from 'class-validator';
import { FileEntity } from 'src/files/entities/file.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { PostStatus } from '../entities/posts.entity';

export class CreatePostDto {
  @ApiProperty({ example: 'Lorem ipsum dolor sit amet' })
  @IsNotEmpty()
  content: 'text' | null;

  @ApiProperty({ type: () => FileEntity })
  @IsOptional()
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'imageNotExists',
  })
  photo?: FileEntity | null;

  @ApiProperty({ type: () => FileEntity })
  @IsOptional()
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'videoNotExists',
  })
  video?: FileEntity | null;

  status: PostStatus;
}
