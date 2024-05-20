import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'chat', component: ChatRoomComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
];
