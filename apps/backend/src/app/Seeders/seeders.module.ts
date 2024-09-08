import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from '../conversations/conversation.types';
import { UserConversation } from '../JoinedEntities/UserConversation';
import { Message } from '../messages/message.types';
import { User } from '../users/user.entity';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { SeederService } from './seeder.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Conversation, UserConversation, Message]),
    UsersModule,
  ],
  providers: [SeederService, UsersService],
  exports: [SeederService],
})
export class SeedersModule {}
