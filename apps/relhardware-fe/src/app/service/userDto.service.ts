import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserResponseDto } from '../model/user-response.dto';
import { Observable } from 'rxjs';

@Injectable()
export class UserResponseDtoService {

    constructor(private http: HttpClient) { }

    getUserResponseDtos(): Observable<UserResponseDto[]> {
        return this.http.get<UserResponseDto[]>('/api/users');

    }


}
