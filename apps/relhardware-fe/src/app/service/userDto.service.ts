import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
 import { Observable } from 'rxjs';
import { IUserDto } from '@relhardware/dto-shared';
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class UserResponseDtoService {
  private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getUserResponseDtos(): Observable<IUserDto[]> {
        return this.http.get<IUserDto[]>(`${this.apiUrl}/users`,);

    }


}
