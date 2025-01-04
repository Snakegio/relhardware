import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IItemTypeDto } from '@relhardware/dto-shared';

@Injectable()
export class ItemService {
  constructor(private http: HttpClient) {}

  getItemTypes(): Observable<IItemTypeDto[]> {
    return this.http.get<IItemTypeDto[]>('api/item-type');
  }
}
