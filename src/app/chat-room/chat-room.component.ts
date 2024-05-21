import { CommonModule } from '@angular/common';
import { Component, DestroyRef, ElementRef, HostListener, OnInit, ViewChild, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChatStoreService } from '../shared/services/chat-store.service';
import { IChat } from '../shared/interface/chat-interface';
import { LoginNameService } from '../shared/services/login-name.service';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss',
})
export class ChatRoomComponent {
  fb = inject(FormBuilder);
  destroyRef = inject(DestroyRef);
  storeChat = inject(ChatStoreService);
  storeLogin = inject(LoginNameService);
  isLoading = signal<boolean>(false);

  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
  displayedArray = signal<IChat[]>([]);
  listData$ = new BehaviorSubject<IChat[]>(JSON.parse(localStorage.getItem(this.storeChat.LOCALSTORAGE_KEY)!));
  itemsToShow = 10;

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
    this.scrollToBottom();
  }

  loadMoreItems() {
    this.isLoading.set(true);
    const currentLength = this.displayedArray().length;
    const allArray = JSON.parse(localStorage.getItem(this.storeChat.LOCALSTORAGE_KEY)!);
    const moreItems = allArray.slice(Math.max(0, allArray.length - this.itemsToShow - currentLength), allArray.length - currentLength);
    this.displayedArray.update((state) => {
      return [...moreItems, ...state];
    });
    this.isLoading.set(false);
  }

  // Scroll event listener for the specific element
  onElementScroll(event: Event): void {
    const scrollTop = (event.target as HTMLElement).scrollTop;

    // Check if user has scrolled to the top
    if (scrollTop === 0) {
      this.loadMoreItems();
    }
  }

  scrollToBottom(): void {
    ``;
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error(err);
    }
  }

  ngOnInit(): void {
    this.loadMoreItems();
    this.storeChat.localStorageObservable.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((val) => {
      this.displayedArray.update((state) => {
        return [...state, val[val.length - 1]];
      });
    });
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
    this.scrollContainer.nativeElement.addEventListener('scroll', this.onElementScroll.bind(this));
  }
}
