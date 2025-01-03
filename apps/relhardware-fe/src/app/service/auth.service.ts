import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, of, shareReplay, switchMap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { User } from '../models/user';

type Token = {
  access_token: string;
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser = signal<User | null>(null);
  private http = inject(HttpClient);

  constructor() {
    effect(() => {
      console.debug('user state changed', this.currentUser());
    });
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post<Token>('api/auth/login', {
        email: email,
        password: password,
      })
      .pipe(
        switchMap((response) => {
          if (response.access_token) {
            localStorage.setItem('token', response.access_token);
          }
          return of(true);
        }),
        catchError((error) => {
          console.error('Error during login:', error);
          return of(false);
        }),
        shareReplay()
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUser.set(null);
  }

  private decodeToken(token: string): User | null {
    try {
      return jwtDecode<User>(token);
    } catch (e) {
      console.error('Errore nella decodifica del token:', e);
      return null;
    }
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!!token && !this.isTokenExpired(token)) {
      this.setUserFromToken(token);
      return true;
    }
    return false;
  }

  private setUserFromToken(token: string): void {
    const user = this.decodeToken(token);
    if (user) {
      this.currentUser.set(user);
    } else {
      this.currentUser.set(null);
    }
  }

  private isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) {
      return true;
    }
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp < now;
  }
}
