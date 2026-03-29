import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { ChevronLeft, Palette, Globe, Lock, Save } from 'lucide-angular';

import { PrivateApiService } from '../../service/private.api.service';
import { ColorSchemeRequest } from '../../model/palette';
import { ColorPickerDirective } from 'ngx-color-picker';
import { ToastService } from '../../service/toast.service';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [ReactiveFormsModule, LucideAngularModule, RouterLink, ColorPickerDirective],
  templateUrl: './new.html',
})
export class New {
  private fb = inject(NonNullableFormBuilder);
  private privateApi = inject(PrivateApiService);
  private router = inject(Router);
  private toast = inject(ToastService);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    hex: ['#db2777', [Validators.required]],
    isPublic: [true],
  });

  // Ícones para o template
  readonly icons = {
    chevronLeft: ChevronLeft,
    palette: Palette,
    globe: Globe,
    lock: Lock,
    save: Save,
  };

  onSubmit() {
    if (this.form.valid) {
      const data: ColorSchemeRequest = this.form.getRawValue();

      this.toast.show('Gerando sua paleta...', 'info');

      this.privateApi.createPalette(data).subscribe({
        next: () => {
          this.toast.show('Paleta criada com sucesso!', 'success');
          this.router.navigate(['/explore']);
        },
        error: (err) => {
          this.toast.show('Erro ao salvar. Verifique se você está logado.', 'error');
        },
      });
    } else {
      this.toast.show('Preencha o nome e escolha uma cor válida.', 'info');
    }
  }
}
