import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '@relhardware/dto-shared';

@Injectable({ providedIn: 'root' })
export class UserResponseDtoService {
  constructor(private http: HttpClient) {}

  getUserResponseDtos(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`api/users`);
  }
}
