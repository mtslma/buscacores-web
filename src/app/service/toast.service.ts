import { Injectable, signal } from '@angular/core';

export interface Toast {
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  msg = signal<Toast | null>(null);

  show(message: string, type: 'success' | 'error' | 'info' = 'success') {
    this.msg.set({ message, type });
    setTimeout(() => this.msg.set(null), 3500);
  }
}
