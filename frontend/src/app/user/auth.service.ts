import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  signup(user: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, user);
  }

  login(user: { username: string; password: string }): Observable<any> {
    const url = `${this.baseUrl}/auth/login`;
    console.log(url);
    return this.http.post(url, user, { withCredentials: true })
      .pipe(
        catchError(error => {
          console.error('Login failed', error);
          return throwError(error);
        })
      );
  }
  
}
