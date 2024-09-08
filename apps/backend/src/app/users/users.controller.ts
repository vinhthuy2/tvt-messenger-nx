import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ConversationsService } from '../conversations/conversations.service';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private conversationService: ConversationsService,
  ) {}

  @Get('/:email')
  async getByMail(@Param('email') email: string, @Res() res: Response) {
    const user = await this.userService.findByEmail(email);
    res.status(HttpStatus.OK).json(user);
  }

  @Get('/:id/friends')
  async getFriends(@Param('id') id: string, @Res() res: Response) {
    const friends = await this.userService.findFriends(id);
    res.status(HttpStatus.OK).json(friends);
  }

  @Get('/:id/conversations')
  async getConversations(@Param('id') id: string, @Res() res: Response) {
    const conversations = await this.conversationService.findByUserId(id);
    res.status(HttpStatus.OK).json(conversations);
  }
}
