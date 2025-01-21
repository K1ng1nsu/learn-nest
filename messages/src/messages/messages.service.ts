import { Injectable, Scope } from '@nestjs/common';
import { MessagesRepository } from './message.repository';

@Injectable()
export class MessageService {
  constructor(public messagesRepo: MessagesRepository) {
    console.log('MessageService Created');
  }
  findOne(id: string) {
    return this.messagesRepo.findOne(id);
  }
  findAll() {
    return this.messagesRepo.findAll();
  }
  create(content: string) {
    return this.messagesRepo.create(content);
  }
}
