import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import { FileEntity } from 'src/files/entities/file.entity';

export enum PostStatus {
  PUBLISH = 'publish',
  DRAFT = 'draft',
}

@Entity()
export class Posts extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Index()
  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @Column({ type: 'text' })
  content: string | null;

  @Column({
    type: 'enum',
    enum: PostStatus,
    default: PostStatus.DRAFT, // Set default status to draft
  })
  status: PostStatus;

  @ManyToOne(() => FileEntity, {
    eager: true,
    nullable: true,
  })
  photo?: FileEntity | null;

  @ManyToOne(() => FileEntity, {
    eager: true,
    nullable: true,
  })
  video?: FileEntity | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
