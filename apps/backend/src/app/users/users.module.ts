import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from '../conversations/conversation.types';
import { ConversationsService } from '../conversations/conversations.service';
import { UserConversation } from '../JoinedEntities/UserConversation';
import { CurrentUser } from './current-user.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserConversation, Conversation])],
  providers: [UsersService, ConversationsService, CurrentUser],
  controllers: [UsersController],
  exports: [TypeOrmModule, UsersService, CurrentUser],
})
export class UsersModule {}
