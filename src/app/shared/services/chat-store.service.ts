import { Injectable, signal } from '@angular/core';
import { IChat } from '../interface/chat-interface';

@Injectable({
  providedIn: 'root',
})
export class ChatStoreService {
  readonly listChat = signal<IChat[]>([]);

  resetState() {
    this.listChat.set([]);
  }

  readonly addOne = (chat: IChat) => {
    this.listChat.update((state) => {
      return [...state, chat];
    });
  };
}
