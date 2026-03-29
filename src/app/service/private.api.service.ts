import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ColorSchemeRequest, Palette, PaletteResponse } from '../model/palette';

@Injectable({
  providedIn: 'root',
})
export class PrivateApiService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080';

  createPalette(palette: ColorSchemeRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/palette`, palette);
  }

  getPrivatePalettes(
    page: number = 0,
    size: number = 20,
    sort: string = 'createdAt',
    direction: string = 'desc',
  ): Observable<PaletteResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', `${sort},${direction}`);

    return this.http.get<PaletteResponse>(`${this.baseUrl}/palette/my-palettes`, { params });
  }

  updatePalette(id: number, palette: ColorSchemeRequest): Observable<Palette> {
    return this.http.put<Palette>(`${this.baseUrl}/palette/${id}`, palette);
  }

  deletePalette(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/palette/${id}`);
  }

  toggleLike(id: number): Observable<Palette> {
    return this.http.post<Palette>(`${this.baseUrl}/palette/${id}/like`, {});
  }
}
