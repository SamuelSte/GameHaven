import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.http.post(`${this.baseUrl}/auth/login`, user);
  }
}
