import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserDto } from '@relhardware/dto-shared';
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(email:string, password:string): Observable<any> {
    return this.http.post<any>( `${this.apiUrl}/auth/login`,  { "email": email, "password": password});

  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }



}
