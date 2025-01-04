import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRoleDto } from '@relhardware/dto-shared';

@Injectable({ providedIn: 'root' })
export class RolesDtoService {
  constructor(private http: HttpClient) {}

  getRolesDtos(): Observable<IRoleDto[]> {
    return this.http.get<IRoleDto[]>(`api/roles`);
  }

  patchRole(id: number, roleModified: IRoleDto): Observable<IRoleDto[]> {
    return this.http.patch<IRoleDto[]>(`api/roles/` + id, roleModified);
  }
}
