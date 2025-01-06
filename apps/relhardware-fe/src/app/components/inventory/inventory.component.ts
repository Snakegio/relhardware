import { Component, inject, OnInit, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ripple } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { Toolbar } from 'primeng/toolbar';
import { IItem } from '@relhardware/dto-shared';
import { ItemService } from '../../service/item.service';
import { CreateItemComponent } from '../dialog/create-item/create-item.component';

@Component({
  selector: 'app-inventory',
  imports: [
    Button,
    InputText,
    ReactiveFormsModule,
    Ripple,
    TableModule,
    Toolbar,
    FormsModule,
    CreateItemComponent,
  ],
  providers: [ItemService],
  templateUrl: './inventory.component.html',
  standalone: true,
})
export class InventoryComponent implements OnInit {
  private itemService: ItemService = inject(ItemService);
  items = signal<IItem[]>([]);

  showDialog = false;

  ngOnInit() {
    this.updateData();
  }

  updateData() {
    this.itemService.getItem().subscribe({
      next: (items) => {
        this.items.set(items);
      },
    });
  }

  openNew() {
    this.showDialog = true;
  }

  onItemSave(item: any) {
    //TODO
  }

  deleteElem($event: MouseEvent, item: any) {
    //TODO
  }
}
