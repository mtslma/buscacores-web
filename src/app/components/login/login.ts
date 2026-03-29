import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule, LogIn } from 'lucide-angular';
import { AuthService } from '../../service/auth.service';
import { RouterLink } from '@angular/router';
import { ToastService } from '../../service/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, LucideAngularModule, RouterLink],
  templateUrl: './login.html',
})
export class Login {
  private fb = inject(NonNullableFormBuilder);
  private authService = inject(AuthService);
  private toast = inject(ToastService);

  protected readonly icons = { LogIn };

  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe({
        next: () => this.toast.show('Bem-vindo ao Busca Cores!', 'success'),
        error: () => this.toast.show('Usuário ou senha inválidos', 'error'),
      });
    }
  }
}
