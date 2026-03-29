// gemini/src/app/app.routes.ts
import { Routes } from '@angular/router';
import { Welcome } from './components/welcome/welcome';
import { Explore } from './components/explore/explore';
import { Login } from './components/login/login';
import { New } from './components/new/new';
import { Profile } from './components/profile/profile';
import { Signup } from './components/signup/signup';
import { authGuard } from './auth-guard'; // Importação correta

export const routes: Routes = [
  { path: '', component: Welcome, title: 'Busca Cores - Bem vindo' },
  { path: 'explore', component: Explore, title: 'Busca Cores - Explorar' },
  { path: 'login', component: Login, title: 'Busca Cores - Login' },
  { path: 'signup', component: Signup, title: 'Busca Cores - Criar Conta' },
  { path: 'new', component: New, title: 'Busca Cores - Nova Paleta', canActivate: [authGuard] },
  { path: 'profile', component: Profile, title: 'Busca Cores - Perfil', canActivate: [authGuard] },
];
