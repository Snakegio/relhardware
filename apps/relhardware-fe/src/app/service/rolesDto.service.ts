import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
 import { Observable } from 'rxjs';
import { IRoleDto } from '@relhardware/dto-shared';
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class RolesDtoService {
  private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getRolesDtos(): Observable<IRoleDto[]> {
        return this.http.get<IRoleDto[]>(`${this.apiUrl}/roles`,);

    }

  patchRole(id:string, roleModified: IRoleDto): Observable<IRoleDto[]> {
    return this.http.patch<IRoleDto[]>(`${this.apiUrl}/role/`+id, roleModified );

  }


}
