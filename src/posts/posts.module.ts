import { Module } from '@nestjs/common';
import { Posts } from './posts';
import { PostsController } from './posts.controller';

@Module({
  providers: [Posts],
  controllers: [PostsController]
})
export class PostsModule {}
