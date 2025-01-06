import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IItemType } from '@relhardware/dto-shared';

@Injectable()
export class ItemTypeService {
  private http = inject(HttpClient);

  findAll(): Observable<IItemType[]> {
    return this.http.get<IItemType[]>('api/item-type');
  }

  createItemType(itemType: string) {
    return this.http.post('api/item-type', { name: itemType });
  }

  deleteItemType(idItemType: number) {
    return this.http.delete(`api/item-type/${idItemType}`);
  }
  updateItemType(idItemType: number, itemType: IItemType) {
    return this.http.patch(`api/item-type/${idItemType}`, itemType);
  }
}
