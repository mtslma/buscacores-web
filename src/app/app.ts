import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import {
  Forward,
  LogOut,
  LucideAngularModule,
  Palette,
  Plus,
  Telescope,
  User,
} from 'lucide-angular';
import { AuthService } from './service/auth.service';
import { ToastComponent } from './components/toast/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, LucideAngularModule, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('buscacores');

  // Tem que registrar os ícones por aqui
  protected readonly icons = {
    palette: Palette,
    plus: Plus,
    logout: LogOut,
    user: User,
    telescope: Telescope,
  };

  // Injetando os serviços
  authService = inject(AuthService);

  // Função de logout
  handleLogout() {
    this.authService.logout();
  }
}
