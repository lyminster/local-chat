import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChatStoreService } from '../shared/services/chat-store.service';
import { IChat } from '../shared/interface/chat-interface';
import { LoginNameService } from '../shared/services/login-name.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss',
})
export class ChatRoomComponent {
  fb = inject(FormBuilder);
  storeChat = inject(ChatStoreService);
  storeLogin = inject(LoginNameService);

  listData$ = new BehaviorSubject<IChat[]>([]);

  form = this.fb.group({
    message: ['', Validators.required],
  });

  sendMessage(): void {
    let data: IChat = {
      createdAt: new Date().toString(),
      username: this.storeLogin.username(),
      message: this.form.controls['message'].value!,
    };
    this.storeChat.addToStorage(data);
    this.form.reset();
  }

  ngOnInit(): void {
    // const listChat: IChat[] = JSON.parse(localStorage.getItem(this.storeChat.LOCALSTORAGE_KEY)!) as IChat[];
    // this.listData$.next(listChat);
  }
}
