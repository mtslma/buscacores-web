import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly API_URL = 'http://localhost:8080';

  // Signal para controlar se o usuário está logado
  isLoggedIn = signal<boolean>(!!localStorage.getItem('token'));

  login(credentials: any) {
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, credentials).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        this.isLoggedIn.set(true);
        this.router.navigate(['/profile']);
      }),
    );
  }

  signup(user: any): Observable<any> {
    return this.http.post(`${this.API_URL}/login/register`, user);
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }
}
