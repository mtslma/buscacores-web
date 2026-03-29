import { Component, inject, signal, OnInit } from '@angular/core';
import { Palette } from '../../model/palette';
import { PrivateApiService } from '../../service/private.api.service';
import { PaletteCard } from '../pallete-card/pallete-card';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  LucideAngularModule,
  Edit2,
  Trash2,
  X,
  Check,
  Globe,
  Lock,
  Palette as PaletteIcon,
} from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { ColorPickerDirective } from 'ngx-color-picker';
import { ToastService } from '../../service/toast.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    PaletteCard,
    ReactiveFormsModule,
    LucideAngularModule,
    ColorPickerDirective,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './profile.html',
})
export class Profile implements OnInit {
  private api = inject(PrivateApiService);
  private fb = inject(NonNullableFormBuilder);
  private toast = inject(ToastService);

  palettes = signal<Palette[]>([]);
  editingId = signal<number | null>(null);

  // Sinal para controlar o ID da paleta que será excluída via modal personalizado
  deleteId = signal<number | null>(null);

  // Adicionado para suportar a ordenação igual ao Explore
  currentSort = signal<string>('createdAt,desc');

  readonly icons = {
    edit: Edit2,
    trash: Trash2,
    x: X,
    check: Check,
    globe: Globe,
    lock: Lock,
    palette: PaletteIcon, // Adicionado para o ícone do @empty
  };

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    hex: ['', [Validators.required]],
    isPublic: [true],
  });

  ngOnInit() {
    this.loadPalettes();
  }

  loadPalettes() {
    const [field, dir] = this.currentSort().split(',');

    this.api.getPrivatePalettes(0, 50, field, dir).subscribe({
      next: (response) => {
        this.palettes.set(response.content);
      },
      error: (err) => {
        this.toast.show('Erro ao carregar suas paletas.', 'error');
        console.error(err);
      },
    });
  }

  // Adicionado para gerenciar a troca de ordenação no select
  changeSort(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.currentSort.set(value);
    this.loadPalettes();
  }

  startEdit(palette: Palette) {
    this.editingId.set(palette.id);

    this.form.patchValue({
      name: palette.name,
      hex: palette.primaryColor,
      isPublic: palette.isPublic,
    });
  }

  cancelEdit() {
    this.editingId.set(null);
  }

  saveEdit() {
    const id = this.editingId();
    if (id && this.form.valid) {
      this.api.updatePalette(id, this.form.getRawValue()).subscribe({
        next: () => {
          this.editingId.set(null);
          this.loadPalettes();
          this.toast.show('Paleta atualizada com sucesso!', 'success');
        },
        error: (err) => {
          this.toast.show('Erro ao atualizar a paleta.', 'error');
          console.error(err);
        },
      });
    }
  }

  // Abre o modal de confirmação personalizado definindo o ID
  askDelete(id: number) {
    this.deleteId.set(id);
  }

  // Fecha o modal de confirmação
  cancelDelete() {
    this.deleteId.set(null);
  }

  // Executa a exclusão após a confirmação no modal personalizado
  executeDelete() {
    const id = this.deleteId();
    if (id) {
      this.api.deletePalette(id).subscribe({
        next: () => {
          // Atualiza a lista local removendo a paleta deletada
          this.palettes.set(this.palettes().filter((p) => p.id !== id));
          this.toast.show('Paleta excluída com sucesso!', 'success');
          this.deleteId.set(null); // Fecha o modal
        },
        error: (err) => {
          this.toast.show('Erro ao deletar paleta: ' + err.status, 'error');
          this.deleteId.set(null);
        },
      });
    }
  }
}
