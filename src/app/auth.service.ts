
import { Injectable, signal } from '@angular/core';
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = signal(false);

  constructor() {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    this.isLoggedIn.set(!!token);
  }

  login(credentials: {email: string, password?: string, role?: string}) {
    const dummyJwt = this.generateDummyJwt(credentials.email, credentials.role || 'staff');
    return of(dummyJwt).pipe(
      delay(1000),
      tap((jwt) => {
        localStorage.setItem('token', jwt);
        this.isLoggedIn.set(true);
      })
    );
  }

  register(credentials: {email: string, password?: string, role?: string}) {
    return this.login(credentials);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedIn.set(false);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role;
    } catch (e) {
      return null;
    }
  }

  private generateDummyJwt(email: string, role: string): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({ email, role }));
    const signature = 'dummy-signature';
    return `${header}.${payload}.${signature}`;
  }
}
