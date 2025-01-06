import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICompany } from '@relhardware/dto-shared';
@Injectable()
export class CompanyService {
  private http = inject(HttpClient);

  findAll(): Observable<ICompany[]> {
    return this.http.get<ICompany[]>('api/company');
  }

  getCompanyById(id: number): Observable<ICompany[]> {
    return this.http.get<ICompany[]>('api/company/'+id);
  }

  postCompany(companyDto: ICompany): Observable<ICompany> {
    return this.http.post<ICompany>('api/company', companyDto);
  }

  patchCompany(id: number, companyDto: ICompany): Observable<ICompany[]> {
    return this.http.patch<ICompany[]>('api/company/'+id, companyDto);
  }

  deleteCompany(id: number): Observable<ICompany[]> {
    return this.http.delete<ICompany[]>('api/company/'+id);
  }


}

