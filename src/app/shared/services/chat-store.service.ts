import { Injectable, signal } from '@angular/core';
import { IChat } from '../interface/chat-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatStoreService {
  readonly LOCALSTORAGE_KEY = 'listChat';

  localStorageObservable = new Observable<IChat[]>((observer) => {
    window.addEventListener('storage', (event) => {
      observer.next(JSON.parse(localStorage.getItem(this.LOCALSTORAGE_KEY)!));
    });
  });

  readonly addToStorage = (chat: IChat): void => {
    try {
      const localStorageKey = this.LOCALSTORAGE_KEY;
      let storedChats: IChat[] | null = JSON.parse(localStorage.getItem(localStorageKey)!) as IChat[] | null;

      if (!storedChats) {
        storedChats = [];
      }

      storedChats.push(chat);
      localStorage.setItem(localStorageKey, JSON.stringify(storedChats));
      var event = document.createEvent('Event');
      event.initEvent('storage', true, true);
      window.dispatchEvent(event);
    } catch (error) {
      console.error('Error adding chat to localStorage:', error);
    }
  };
}
