import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICompanyDto } from '@relhardware/dto-shared';
@Injectable()
export class CompanyService {
  private http = inject(HttpClient);

  getCompanies(): Observable<ICompanyDto[]> {
    return this.http.get<ICompanyDto[]>('api/company');
  }

  getCompanyById(id: number): Observable<ICompanyDto[]> {
    return this.http.get<ICompanyDto[]>('api/company/'+id);
  }

  postCompany(companyDto: ICompanyDto): Observable<ICompanyDto> {
    return this.http.post<ICompanyDto>('api/company', companyDto);
  }

  patchCompany(id: number, companyDto: ICompanyDto): Observable<ICompanyDto[]> {
    return this.http.patch<ICompanyDto[]>('api/company/'+id, companyDto);
  }

  deleteCompany(id: number): Observable<ICompanyDto[]> {
    return this.http.delete<ICompanyDto[]>('api/company/'+id);
  }


}

