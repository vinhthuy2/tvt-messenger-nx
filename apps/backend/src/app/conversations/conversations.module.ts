import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JoinedEntitiesModule } from '../JoinedEntities/joined-entities.module';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { Conversation } from './conversation.types';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';

@Module({
  providers: [ConversationsService, UsersService],
  imports: [
    TypeOrmModule.forFeature([Conversation]),
    UsersModule,
    JoinedEntitiesModule,
  ],
  controllers: [ConversationsController],
  exports: [TypeOrmModule],
})
export class ConversationsModule {}
