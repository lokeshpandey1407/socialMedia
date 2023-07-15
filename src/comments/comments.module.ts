import { Module } from '@nestjs/common';
import { Comments } from './comments';
import { CommentsController } from './comments.controller';

@Module({
  providers: [Comments],
  controllers: [CommentsController]
})
export class CommentsModule {}
