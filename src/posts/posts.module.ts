import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { Posts } from './dto/posts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Posts])],
  providers: [],
  controllers: [PostsController]
})
export class PostsModule {}
