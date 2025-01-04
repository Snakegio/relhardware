import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { IAssignationDto } from '@relhardware/dto-shared';
@Injectable()
export class AssignationService {
  private http = inject(HttpClient);

  getAssignations(): Observable<IAssignationDto[]> {
    return this.http.get<IAssignationDto[]>('api/assignation');
  }

  getAssignationById(id: number): Observable<IAssignationDto[]> {
    return this.http.get<IAssignationDto[]>('api/assignation/'+id);
  }

  postAssignation(assignationDto: IAssignationDto): Observable<IAssignationDto> {
    return this.http.post<IAssignationDto>('api/assignation', assignationDto);
  }

  patchAssignation(id: number, assignationDto: IAssignationDto): Observable<IAssignationDto[]> {
    return this.http.patch<IAssignationDto[]>('api/assignation/'+id, assignationDto);
  }

  deleteAssignation(id: number): Observable<IAssignationDto[]> {
    return this.http.delete<IAssignationDto[]>('api/assignation/'+id);
  }


}

