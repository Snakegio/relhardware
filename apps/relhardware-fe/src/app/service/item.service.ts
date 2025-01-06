import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IItem } from '@relhardware/dto-shared';

@Injectable()
export class ItemService {
  private http = inject(HttpClient);

  getItem(): Observable<IItem[]> {
    return this.http.get<IItem[]>('api/item');
  }

  createItem(item: string) {
    return this.http.post('api/item', { name: item });
  }

  deleteItem(idItem: number) {
    return this.http.delete(`api/item/${idItem}`);
  }
  updateItem(idItem: number, item: IItem) {
    return this.http.patch(`api/item/${idItem}`, item);
  }
}
