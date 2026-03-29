import { Component, inject, signal, OnInit } from '@angular/core';
import { PublicApiService } from '../../service/public.api.service';
import { Palette as PaletteModel } from '../../model/palette'; // Renomeado para evitar conflito com o ícone
import { PaletteCard } from '../pallete-card/pallete-card';
import { LucideAngularModule, Filter, Palette } from 'lucide-angular'; // Importado Palette (ícone)
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [PaletteCard, LucideAngularModule, RouterLink],
  templateUrl: './explore.html',
})
export class Explore implements OnInit {
  private api = inject(PublicApiService);

  palettes = signal<PaletteModel[]>([]);
  currentSort = signal<string>('createdAt,desc');

  protected readonly icons = {
    filter: Filter,
    palette: Palette,
  };

  ngOnInit() {
    this.load();
  }

  load() {
    const [field, dir] = this.currentSort().split(',');
    this.api.getPublicPalettes(0, 20, field, dir).subscribe({
      next: (res) => this.palettes.set(res.content),
    });
  }

  changeSort(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.currentSort.set(value);
    this.load();
  }
}
