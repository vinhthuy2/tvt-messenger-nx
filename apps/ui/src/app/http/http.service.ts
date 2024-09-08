import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  Conversation,
  ConversationSummaryDto,
  CreateConversationRequestDto,
  User,
  UserConversationsDto,
} from '@core/types';

import { ENVIRONMENT_CONFIG, EnvironmentConfig } from '@env/environment.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  apiBaseUrl: string;

  constructor(
    private http: HttpClient,
    @Inject(ENVIRONMENT_CONFIG) environmentConfig: EnvironmentConfig
  ) {
    this.apiBaseUrl = environmentConfig.apiBaseUrl;
  }

  getConservationListByUserId(
    userId: string
  ): Observable<UserConversationsDto> {
    return this.http.get<UserConversationsDto>(
      `api/users/${userId}/conversations`
    );
  }

  getConservationById(conversationId: string): Observable<Conversation> {
    return this.http.get<Conversation>(
      `api/conversations/${conversationId}`
    );
  }

  createConversation(
    request: CreateConversationRequestDto
  ): Observable<ConversationSummaryDto> {
    return this.http.post<ConversationSummaryDto>(
      'api/conversations',
      request
    );
  }

  getFriends(userId: string): Observable<User[]> {
    return this.http.get<User[]>(`api/users/${userId}/friends`);
  }

  getUser(email: string): Observable<User> {
    return this.http.get<User>(`api/users/${email}`);
  }
}
