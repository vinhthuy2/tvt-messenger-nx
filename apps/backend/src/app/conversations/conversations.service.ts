import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, In, Repository } from 'typeorm';
import { UserConversation } from '../JoinedEntities/UserConversation';
import { CurrentUser } from '../users/current-user.service';
import { User } from '../users/user.entity';
import {
  Conversation,
  ConversationDto,
  ConversationSummaryDto,
  CreateConversationRequestDto,
  mapToConversationDto,
  mapToConversationSummaryDto,
  UserConversationsDto,
} from './conversation.types';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private repository: Repository<Conversation>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserConversation)
    private userConversationRepository: Repository<UserConversation>,
    private currentUser: CurrentUser,
  ) {}

  async findAll(): Promise<Conversation[]> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<ConversationDto | null> {
    const entity = await this.getOne(id);

    if (!entity) {
      return null;
    }
    return mapToConversationDto(entity);
  }

  async findByUserId(
    userId: string,
    page: number = 0,
    pageSize: number = 10,
  ): Promise<UserConversationsDto> {
    const userConversations = await this.userConversationRepository.find({
      where: {
        user: {
          id: Equal(userId),
        },
      },
      skip: page * pageSize,
      take: pageSize,
      relations: [
        'conversation',
        'conversation.lastMessage',
        'conversation.userConversations',
      ],
    });

    console.log('userConversations', userConversations[0]);

    return {
      items: userConversations.map((c) => {
        return {
          id: c.conversation.id,
          name: c.conversation.name,
          avatar: c.conversation.avatar,
          isGroup: c.conversation.isGroup,
          isArchived: c.isArchived,
          isMuted: c.isMuted,
          isPinned: c.isPinned,
          lastSeen: c.lastSeen,
          participantIds: [],
          lastMessage: c.conversation.lastMessage
            ? {
                content: c.conversation.lastMessage.content,
                timestamp: c.conversation.lastMessage.timestamp,
              }
            : null,
        };
      }),
      userId,
      total: userConversations.length,
      page,
      pageSize,
    };
  }

  async findByParticipants(
    participantIds: string[],
  ): Promise<Conversation[] | null> {
    const participants = await this.userRepository.find({
      where: {
        id: In(participantIds),
      },
    });

    if (participants.length !== participantIds.length) {
      throw new Error('Some participants not found!');
    }

    return await this.repository
      .createQueryBuilder('c')
      .select('c')
      .innerJoin('c.participants', 'p')
      .groupBy('c.id')
      .having('COUNT(p.id) = :participantCount', {
        participantCount: participantIds.length,
      })
      .andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select('uc.conversationId')
          .from('user_conversation', 'uc')
          .where('uc.userId IN (:...participantIds)', { participantIds })
          .groupBy('uc.conversationId')
          .having('COUNT(uc.userId) = :participantCount', {
            participantCount: participantIds.length,
          })
          .getQuery();

        return 'c.id IN ' + subQuery;
      })
      .getMany();
  }

  async create(
    dto: CreateConversationRequestDto,
  ): Promise<ConversationSummaryDto> {
    const participantIds = dto.participantIds;
    const participants = await this.userRepository.find({
      where: {
        id: In(participantIds),
      },
    });
    if (participants.length !== participantIds.length) {
      throw new Error('Some participants not found!');
    }

    const friendName = participants.find(
      (p) => p.id !== this.currentUser.value.id,
    )?.name;

    const conversation: Conversation = new Conversation(
      friendName!,
      participants,
      new Date(),
    );

    const entity = await this.getOne(
      (await this.repository.save(conversation)).id,
    );

    return mapToConversationSummaryDto(entity!);
  }

  private async getOne(id: string): Promise<Conversation | null> {
    return await this.repository
      .createQueryBuilder('c')
      .where('c.id = :id', { id })
      .leftJoinAndSelect(
        'c.userConversations',
        'uc',
        'uc.conversationId = :conversationId',
        { conversationId: id },
      )
      .leftJoinAndSelect(
        'c.messages',
        'm',
        'm.conversationId = :conversationId',
        { conversationId: id },
      )
      .getOne();
  }
}
