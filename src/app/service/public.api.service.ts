import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaletteResponse } from '../model/palette';

@Injectable({
  providedIn: 'root',
})
export class PublicApiService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080';

  // Busca todas as paletas públicas para a página de exploração.
  getPublicPalettes(
    page: number = 0,
    size: number = 20,
    sortField: string = 'createdAt',
    direction: string = 'desc',
  ): Observable<PaletteResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', `${sortField},${direction}`);

    return this.http.get<PaletteResponse>(`${this.baseUrl}/palette/explore`, { params });
  }

  // Exemplo de busca por nome ou filtros, se o seu backend suportar
  searchPalettes(query: string): Observable<PaletteResponse> {
    const params = new HttpParams().set('name', query);
    return this.http.get<PaletteResponse>(`${this.baseUrl}/palette`, { params });
  }
}
