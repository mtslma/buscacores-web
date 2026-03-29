// src/app/components/signup/signup.ts
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { ToastService } from '../../service/toast.service';
import { LucideAngularModule, UserPlus } from 'lucide-angular';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, LucideAngularModule],
  templateUrl: './signup.html',
})
export class Signup {
  private fb = inject(NonNullableFormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastService);

  protected readonly icons = { UserPlus };

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.form.valid) {
      this.authService.signup(this.form.getRawValue()).subscribe({
        next: () => {
          this.toast.show('Conta criada com sucesso! Faça seu login.', 'success');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.toast.show('Erro ao criar conta. Tente outro nome de usuário.', 'error');
        },
      });
    } else {
      this.toast.show('Preencha os campos corretamente.', 'info');
    }
  }
}
