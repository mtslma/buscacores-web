import { Component, input, signal, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Heart, Copy, Check } from 'lucide-angular';
import { Palette } from '../../model/palette';
import { PrivateApiService } from '../../service/private.api.service';
import { ToastService } from '../../service/toast.service';

@Component({
  selector: 'app-palette-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './pallete-card.html',
})
export class PaletteCard {
  private privateApi = inject(PrivateApiService);
  private toast = inject(ToastService);

  palette = input.required<Palette>();
  internalPalette = signal<Palette | null>(null);
  copiedColor = signal<string | null>(null);

  protected readonly icons = {
    heart: Heart,
    copy: Copy,
    check: Check,
  };

  constructor() {
    effect(
      () => {
        // Sincroniza o sinal interno com o input da paleta
        this.internalPalette.set({ ...this.palette() });
      },
      { allowSignalWrites: true },
    );
  }

  like() {
    const p = this.internalPalette();
    if (!p) return;

    this.privateApi.toggleLike(p.id).subscribe({
      next: (updatedPalette) => {
        // A API retorna o objeto atualizado com o novo isLiked e likesCount
        this.internalPalette.set({ ...updatedPalette });

        // Feedback via Toast
        const message = updatedPalette.isLiked ? 'Paleta curtida!' : 'Like removido';
        this.toast.show(message, 'success');
      },
      error: () => {
        this.toast.show('Faça login para curtir paletas!', 'error');
      },
    });
  }

  async copyToClipboard(color: string) {
    try {
      await navigator.clipboard.writeText(color);
      this.copiedColor.set(color);

      // Feedback via Toast
      this.toast.show(`Cor ${color.toUpperCase()} copiada!`, 'success');

      setTimeout(() => this.copiedColor.set(null), 2000);
    } catch (err) {
      this.toast.show('Erro ao copiar para a área de transferência', 'error');
    }
  }
}
